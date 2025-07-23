using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListBackend.Data;
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
        public async Task<ActionResult<IEnumerable<ToDoTask>>> GetTasks()
        {
            return await _context.ToDoTasks
                .Include(t => t.Category)
                .ToListAsync();
        }

        // POST: api/ToDoTasks
        [HttpPost]
        public async Task<ActionResult<ToDoTask>> PostToDoTask(ToDoTask toDoTask)
        {
            toDoTask.Id = 0;

            if (!_context.Categories.Any(c => c.Id == toDoTask.CategoryId))
            {
                return BadRequest("La categoría especificada no existe.");
            }

            _context.ToDoTasks.Add(toDoTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = toDoTask.Id }, toDoTask);
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

            if (!_context.Categories.Any(c => c.Id == updatedTask.CategoryId))
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
