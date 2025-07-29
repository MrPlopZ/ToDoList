using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListApi.Dtos;
using ToDoListBackend.Data;
using ToDoListBackend.DTOs;
using ToDoListBackend.Models;

namespace ToDoListBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoTasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToDoTasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ToDoTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoTaskDto>>> GetTasks()
        {
            try
            {
                var tasks = await _context.ToDoTasks
                    .Include(t => t.Category)
                    .Include(t => t.Project)
                    .Select(t => new ToDoTaskDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        IsCompleted = t.IsCompleted,
                        DueDate = t.DueDate,
                        CategoryId = t.CategoryId,
                        CategoryName = t.Category != null ? t.Category.Name : null,
                        ProjectId = t.ProjectId,
                        ProjectName = t.Project != null ? t.Project.Name : null
                    })
                    .ToListAsync();

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}\n{ex.InnerException?.Message}");
            }
        }

        // POST: api/ToDoTasks
        [HttpPost]
        public async Task<ActionResult<ToDoTask>> PostToDoTask(ToDoTaskCreateDto toDoTaskDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var toDoTask = new ToDoTask
            {
                Id = 0,
                Title = toDoTaskDto.Title,
                Description = toDoTaskDto.Description,
                IsCompleted = toDoTaskDto.IsCompleted,
                DueDate = toDoTaskDto.DueDate,
                CategoryId = toDoTaskDto.CategoryId,
                ProjectId = toDoTaskDto.ProjectId
            };

            if (!_context.Category.Any(c => c.Id == toDoTask.CategoryId))
            {
                return BadRequest("La categoría especificada no existe.");
            }
            if (!_context.Projects.Any(p => p.Id == toDoTask.ProjectId))
            {
                return BadRequest("El proyecto especificado no existe.");
            }

            _context.ToDoTasks.Add(toDoTask);
            await _context.SaveChangesAsync();

            var createdTask = await _context.ToDoTasks
                .Include(t => t.Category)
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == toDoTask.Id);

            if (createdTask == null)
            {
                return NotFound();
            }

            return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
        }


        // PUT: api/ToDoTasks
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoTask(int id, ToDoTask updatedTask)
        {
            var existingTask = await _context.ToDoTasks.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            if (!_context.Category.Any(c => c.Id == updatedTask.CategoryId))
            {
                return BadRequest("La categoría especificada no existe.");
            }

            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted;
            existingTask.DueDate = updatedTask.DueDate;
            existingTask.CategoryId = updatedTask.CategoryId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ToDoTasks
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoTask(int id)
        {
            var toDoTask = await _context.ToDoTasks.FindAsync(id);
            if (toDoTask == null)
            {
                return NotFound();
            }

            _context.ToDoTasks.Remove(toDoTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
