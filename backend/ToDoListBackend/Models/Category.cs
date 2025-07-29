using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToDoListBackend.Models
{
    [Table("CATEGORY")]
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]
        public ICollection<ToDoTask> Tasks { get; set; } = new List<ToDoTask>();
    }
}
