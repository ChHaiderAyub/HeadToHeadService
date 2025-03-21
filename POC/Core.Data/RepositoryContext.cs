using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Core.Data
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
       : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
