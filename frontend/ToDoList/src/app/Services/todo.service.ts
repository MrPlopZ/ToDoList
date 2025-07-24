import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoTask } from '../Models/todo-task.model';
import { Category } from '../Models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7171/api/ToDoTasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ToDoTask[]> {
    return this.http.get<ToDoTask[]>(this.apiUrl);
  }

  addTask(task: ToDoTask) {
    return this.http.post<ToDoTask>(
      'https://localhost:7171/api/ToDoTasks',
      task
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7171/api/Categories');
  }
}
