using Microsoft.EntityFrameworkCore;
using ToDoListBackend.Models;

namespace ToDoListBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ToDoTask> Tasks { get; set; }
    }
}
