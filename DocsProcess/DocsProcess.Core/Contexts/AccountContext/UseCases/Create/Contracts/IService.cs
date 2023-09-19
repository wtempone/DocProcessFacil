using DocsProcess.Core.Contexts.AccountContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Contracts
{
    public interface IService
    {
        Task SendVerificationEmailAsync(User user, CancellationToken cancellationToken);
    }
}
