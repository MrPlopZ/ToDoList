import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoTask } from '../Models/todo-task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://localhost:7171/api/ToDoTasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ToDoTask[]> {
    return this.http.get<ToDoTask[]>(this.apiUrl);
  }
}
