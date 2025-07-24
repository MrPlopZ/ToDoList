import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TodoService } from './Services/todo.service';
import { ToDoTask } from './Models/todo-task.model';
import { FormsModule } from '@angular/forms';
import { Category } from './Models/category.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ToDoList';
  tasks: ToDoTask[] = [];
  categories: Category[] = [];

  newTask: Partial<ToDoTask> = {
    title: '',
    description: '',
    dueDate: new Date(),
    isCompleted: false,
    categoryId: 4
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error al obtener tareas', err)
    });
    this.todoService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error al obtener categorías', err)
    });
  }

  addTask(): void {
    if (!this.newTask.title?.trim() || !this.newTask.dueDate || !this.newTask.categoryId) return;

    this.todoService.addTask(this.newTask as ToDoTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = {
          title: '',
          description: '',
          dueDate: new Date(),
          isCompleted: false,
          categoryId: 1
        };
      },
      error: (err) => console.error('Error al añadir tarea', err)
    });
  }
}
