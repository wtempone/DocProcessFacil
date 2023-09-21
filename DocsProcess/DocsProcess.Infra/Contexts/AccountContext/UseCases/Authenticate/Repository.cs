using DocsProcess.Core.Contexts.AccountContext.Entities;
using DocsProcess.Core.Contexts.AccountContext.UseCases.Authenticate.Contracts;
using DocsProcess.Infra.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Infra.Contexts.AccountContext.UseCases.Authenticate
{

    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;
        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
            => await _appDbContext
                .Users
                .Include(x => x.Roles)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email.Address == email, cancellationToken);
    }
}
