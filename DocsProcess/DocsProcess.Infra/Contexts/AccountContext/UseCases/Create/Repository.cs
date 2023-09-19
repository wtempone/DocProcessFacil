using DocsProcess.Core.Contexts.AccountContext.Entities;
using DocsProcess.Core.Contexts.AccountContext.UseCases.Create.Contracts;
using DocsProcess.Infra.Data;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Infra.Contexts.AccountContext.UseCases.Create
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;
        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<bool> AnyAsync(string email, CancellationToken cancellationToken)
            => await _appDbContext
                .Users
                .AsNoTracking()
                .AnyAsync(x => x.Email.Address == email, cancellationToken: cancellationToken);

        public async Task SaveAsync(User user, CancellationToken cancellationToken)
        {
            await _appDbContext.Users.AddAsync(user, cancellationToken);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
