using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocsProcess.Core.Contexts.SharedContext.Extensions
{
    public static class StringExtension
    {
        public static string ToBase64(this string text)
            => Convert.ToBase64String(Encoding.ASCII.GetBytes(text));
    }
}
