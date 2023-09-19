using DocsProcess.Core.Contexts.AccountContext.Entities;
using DocsProcess.Infra.Contexts.AccountContext.Mappings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Infra.Data
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        //public DbSet<Role> Roles { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());
            //modelBuilder.ApplyConfiguration(new RoleMap());
        }
    }
}
