using MediatR;

namespace DocsProcess.Api.Extensions
{
    public static class AccountContextExtension
    {
        public static void AddAccountContext(this WebApplicationBuilder builder)
        {
            #region Create
            builder.Services.AddTransient<
                DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Contracts.IRepository,
                DocsProcess.Infra.Contexts.AccountContext.UseCases.Create.Repository
                >();
            builder.Services.AddTransient<
                DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Contracts.IService,
                DocsProcess.Infra.Contexts.AccountContext.UseCases.Create.Service
                >();
            #endregion
        }
        public static void MapAccountEndPoints(this WebApplication app)
        {
            #region Create

            app.MapPost("api/v1/users", async (
                DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Request request,
                IRequestHandler<
                    DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Request,
                    DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Response> handler) =>
            {
                var result = await handler.Handle(request, new CancellationToken());
                return result.IsSuccess
                    ? Results.Created($"api/v1/users/{result.Data?.Id}", result)
                    : Results.Json(result, statusCode: result.Status);
            });
            #endregion
        }
    }
}
