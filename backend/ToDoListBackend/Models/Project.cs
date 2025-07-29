using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToDoListBackend.Models
{
    [Table("PROJECTS")]
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<ToDoTask> Tasks { get; set; } = new List<ToDoTask>();
    }
}