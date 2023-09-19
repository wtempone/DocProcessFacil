using DocsProcess.Core.AccountContext.ValueObjects;
using DocsProcess.Core.Contexts.AccountContext.Entities;
using DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Contracts;
using DocsProcess.Core.Contexts.AccountContext.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Core.Contexts.AccountContext.UseCases.Create
{
    public class Handler:IRequestHandler<Request, Response>
    {
        private readonly IRepository _repository;
        private readonly IService _service;
        public Handler(IRepository repository, IService service)
        {
            _repository = repository;
            _service = service;
        }
        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            #region Valida Requisição
            try
            {
                var res = Specification.Ensure(request);
                if (!res.IsValid)
                {
                    return new Response("Requisição inválida", 400, res.Notifications);
                }
            }
            catch 
            {
                return new Response("Não foi possivel validar a requisição", 500, null);
            }
            #endregion
            #region Gerar Objetos
            Email email;
            Password password;
            User user;
            try
            {
                email = new Email(request.Email);
                password = new Password(request.Password);
                user = new User(request.Name, email, password);
            }
            catch (Exception ex)
            {
                return new Response(ex.Message, 400);
            }
            #endregion
            #region Validar se usuario existe
            try
            {
                var exists = await _repository.AnyAsync(request.Email, cancellationToken);
                if (exists)
                {
                    return new Response("Este e-mail ja está em uso", 400);
                }
            }
            catch
            {
                return new Response("Falha ao verificar e-mail cadastrado no banco", 500);
            }

            #endregion
            #region Persistir dados
            try
            {
                await _repository.SaveAsync(user, cancellationToken);
            }
            catch 
            {
                return new Response("Falha ao cadastrar usuário no banco", 500);
            }
            #endregion
            #region Enviar email de ativacao
            try
            {
                await _service.SendVerificationEmailAsync(user, cancellationToken);
            }
            catch 
            {

                // Do nothing;
            }
            #endregion
            return new Response("Conta Criada", new ResponseData(user.Id, user.Name, user.Email));
        }
    }
}
