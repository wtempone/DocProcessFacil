using DocsProcess.Core.AccountContext.ValueObjects;
using DocsProcess.Core.Contexts.AccountContext.ValueObjects;
using DocsProcess.Core.Contexts.SharedContext.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Core.Contexts.AccountContext.Entities
{

    public class Role : Entity
    {
        public string Name{ get; private set; } = string.Empty;
        public List<User> Users { get; set; } = new();

    }
}
