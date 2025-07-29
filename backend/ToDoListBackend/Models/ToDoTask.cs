using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using ToDoListBackend.Models;

[Table("TODOTASKS")]
public class ToDoTask
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
    public int CategoryId { get; set; }

    [JsonIgnore]
    public Category? Category { get; set; }

    public int ProjectId { get; set; }

    [JsonIgnore]
    public Project? Project { get; set; }
}