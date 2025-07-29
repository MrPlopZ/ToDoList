import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoService } from './Services/todo.service';
import { ToDoTask } from './Models/todo-task.model';
import { Category } from './Models/category.model';
import { Project } from './Models/project.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ToDoList';
  tasks: ToDoTask[] = [];
  categories: Category[] = [];
  projects: Project[] = [];

  @ViewChild('taskForm') taskForm!: NgForm;

  newTask: Partial<ToDoTask> = {
    title: '',
    description: '',
    dueDate: undefined,
    isCompleted: false,
    categoryId: undefined,
    projectId: undefined,
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorías cargadas:', data);
        if (data.length > 0) {
          this.newTask.categoryId = data[0].id;
        }
      },
      error: (err) => console.error('Error al obtener categorías', err),
    });

    this.todoService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Proyectos cargados:', data);
        if (data.length > 0) {
          this.newTask.projectId = data[0].id;
        }
      },
      error: (err) => console.error('Error al obtener proyectos', err),
    });

    this.todoService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error al obtener tareas', err),
    });
  }

  addTask(): void {
    console.log('Formulario enviado:', this.newTask);

    if (
      !this.newTask.title?.trim() ||
      this.newTask.categoryId == null ||
      this.newTask.projectId == null
    ) {
      console.error('Faltan datos requeridos para añadir la tarea');
      return;
    }

    const categoryId = Number(this.newTask.categoryId);
    const projectId = Number(this.newTask.projectId);

    const categoryExists = this.categories.some(c => c.id === categoryId);
    const projectExists = this.projects.some(p => p.id === projectId);
    if (!categoryExists || !projectExists) {
      console.error('Categoría o proyecto no válidos');
      console.log('Categorías disponibles:', this.categories);
      console.log('Proyectos disponibles:', this.projects);
      console.log('categoryId enviado:', categoryId, 'projectId enviado:', projectId);
      return;
    }

    let dueDate: string | undefined;
    if (this.newTask.dueDate && this.newTask.dueDate.trim()) {
      try {
        dueDate = new Date(this.newTask.dueDate + 'T00:00:00').toISOString();
      } catch (error) {
        console.error('Fecha inválida:', this.newTask.dueDate);
        return;
      }
    } else {
      dueDate = undefined;
    }

    const taskToSend: ToDoTask = {
      id: 0,
      title: this.newTask.title!.trim(),
      description: this.newTask.description?.trim() || undefined,
      dueDate: dueDate,
      isCompleted: this.newTask.isCompleted ?? false,
      categoryId: categoryId,
      projectId: projectId,
      categoryName: undefined,
      projectName: undefined,
    };

    console.log('Enviando tarea al backend:', taskToSend);

    this.todoService.addTask(taskToSend).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.taskForm.resetForm();
        this.newTask = {
          title: '',
          description: '',
          dueDate: undefined,
          isCompleted: false,
          categoryId: this.categories.length > 0 ? this.categories[0].id : undefined,
          projectId: this.projects.length > 0 ? this.projects[0].id : undefined,
        };
      },
      error: (err) => {
        console.error('Error al añadir tarea', err);
        console.log('Detalles del error:', JSON.stringify(err.error, null, 2));
      },
    });
  }

  deleteTask(taskId: number): void {
    this.todoService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log(`Tarea con ID ${taskId} eliminada`);
      },
      error: (err) => {
        console.error('Error al eliminar tarea', err);
        console.log('Detalles del error:', JSON.stringify(err.error, null, 2));
      },
    });
  }
}