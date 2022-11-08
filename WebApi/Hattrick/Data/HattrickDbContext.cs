using Hattrick.Models;
using Microsoft.EntityFrameworkCore;

namespace Hattrick.Data
{
    public class HattrickDbContext : DbContext
    {
        public HattrickDbContext(DbContextOptions options) : base(options)
        {
        }

        //Dbset
        public DbSet<Match> Match { get; set; }
    }
}
