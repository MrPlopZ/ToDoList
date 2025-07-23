using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListBackend.Models
{
    [Table("TODOTASKS")]
    public class ToDoTask
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}