using DocsProcess.Core.AccountContext.ValueObjects;
using DocsProcess.Core.Contexts.AccountContext.Entities;
using DocsProcess.Core.Contexts.AccountContext.UseCases.Authenticate.Contracts;
using DocsProcess.Core.Contexts.AccountContext.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Core.Contexts.AccountContext.UseCases.Authenticate
{
    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly IRepository _repository;
        public Handler(IRepository repository)
        {
            _repository = repository;
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
            
            #region Validar se usuario existe
            User? user;
            try
            {
                user = await _repository.GetUserByEmailAsync(request.Email, cancellationToken);
                if (user is null)
                {
                    return new Response("Usuário inválido", 400);
                }
            }
            catch
            {
                return new Response("Falha ao obter usuario", 500);
            }
            #endregion
            
            #region Verifica se senha é valido

            if (!user.Password.Challenge(request.Password))
            {
                return new Response("Senha inválida", 400);
            }
            #endregion

            #region Verifica se conta está ativada
            try
            {
                if (!user.Email.Verification.IsActive)
                {
                    return new Response("Conta nativa", 400);

                }
            }
            catch
            {
                return new Response("Falha ao veiricar se usuário ativo", 500);
            }
            #endregion
            #region Retornar dados
            try
            {
                var data = new ResponseData
                {
                    Id = user.Id.ToString(),
                    Name = user.Name,
                    Email = user.Email,
                    Roles = user.Roles.Select(x => x.Name).ToArray(),
                };
                return new Response(string.Empty, data);

            }
            catch 
            {
                return new Response("Falha ao obter perfil do usuário", 500);
            }
            #endregion
        }
    }
}
