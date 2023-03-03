import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TodoItem, TodoItemView } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/api`;

  public constructor(private http: HttpClient) { }

  public getTodoList(): Observable<TodoItemView[]> {
    return this.http.get<TodoItemView[]>(`${this.apiUrl}/todoItems`);
  }

  public createTodo(body: TodoItem): Observable<TodoItemView> {
    return this.http.post<TodoItemView>(`${this.apiUrl}/todoItems`, body);
  }

  public updateTodo(id: string, body: TodoItem): Observable<TodoItemView> {
    return this.http.put<TodoItemView>(`${this.apiUrl}/todoItems/${id}`, body);
  }

  public deleteTodo(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrl}/todoItems/${id}`);
  }
}
