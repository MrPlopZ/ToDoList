import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoTask } from '../Models/todo-task.model';
import { Category } from '../Models/category.model';
import { Project } from '../Models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseApiUrl = 'https://localhost:7171/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ToDoTask[]> {
    return this.http.get<ToDoTask[]>(`${this.baseApiUrl}/ToDoTasks`);
  }

  addTask(task: ToDoTask): Observable<ToDoTask> {
    return this.http.post<ToDoTask>(`${this.baseApiUrl}/ToDoTasks`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/ToDoTasks/${taskId}`);
  }

  updateTask(task: ToDoTask): Observable<ToDoTask> {
    return this.http.put<ToDoTask>(`${this.baseApiUrl}/ToDoTasks/${task.id}`, task);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseApiUrl}/Categories`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}/Projects`);
  }
}