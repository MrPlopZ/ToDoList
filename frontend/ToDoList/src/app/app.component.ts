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
        if (data.length > 0) {
          this.newTask.categoryId = data[0].id;
        }
      },
    });

    this.todoService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        if (data.length > 0) {
          this.newTask.projectId = data[0].id;
        }
      },
    });

    this.todoService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
    });
  }

  addTask(): void {
    if (
      !this.newTask.title?.trim() ||
      this.newTask.categoryId == null ||
      this.newTask.projectId == null
    ) {
      return;
    }

    const categoryId = Number(this.newTask.categoryId);
    const projectId = Number(this.newTask.projectId);

    const categoryExists = this.categories.some(c => c.id === categoryId);
    const projectExists = this.projects.some(p => p.id === projectId);

    if (!categoryExists || !projectExists) {
      return;
    }

    let dueDate: string | undefined;
    if (this.newTask.dueDate?.trim()) {
      try {
        dueDate = new Date(this.newTask.dueDate + 'T00:00:00').toISOString();
      } catch {
        return;
      }
    }

    const taskToSend: ToDoTask = {
      id: 0,
      title: this.newTask.title.trim(),
      description: this.newTask.description?.trim() || undefined,
      dueDate: dueDate,
      isCompleted: this.newTask.isCompleted ?? false,
      categoryId: categoryId,
      projectId: projectId,
      categoryName: undefined,
      projectName: undefined,
    };

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
    });
  }

  deleteTask(taskId: number): void {
    this.todoService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
    });
  }
}
