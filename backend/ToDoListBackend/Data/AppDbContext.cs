using Microsoft.EntityFrameworkCore;
using ToDoListBackend.Models;

namespace ToDoListBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ToDoTask> ToDoTasks { get; set; } = null!;
        public DbSet<Category> Category { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;

    }
}
