using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToDoListBackend.Models
{
    [Table("CATEGORY")]
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]  // Ignorar en la serialización JSON para evitar ciclos
        public ICollection<ToDoTask> Tasks { get; set; } = new List<ToDoTask>();
    }
}
