namespace ToDoListBackend.DTOs
{
    public class ToDoTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int ProjectId { get; set; }
        public string? ProjectName { get; set; }
    }
}