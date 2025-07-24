import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TodoService } from './Services/todo.service';
import { ToDoTask } from './Models/todo-task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoList';
  tasks: ToDoTask[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error al obtener tareas', err)
    });
  }
}
