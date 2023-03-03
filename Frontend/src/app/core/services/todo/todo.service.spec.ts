import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TodoItemView } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const todo: TodoItemView = { id: '1', description: 'Description', isCompleted: true };
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sent GET request to get todos list', () => {
    service.getTodoList().subscribe();
    const req = httpMock.expectOne(`${apiUrl}/api/todoItems`);
    expect(req.request.method).toEqual('GET');
  });

  it('should sent POST request to create todo item', () => {
    service.createTodo(todo).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/api/todoItems`);
    expect(req.request.method).toEqual('POST');
  });

  it('should sent PUT request to get update todo', () => {
    service.updateTodo(todo.id, todo).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/api/todoItems/${todo.id}`);
    expect(req.request.method).toEqual('PUT');
  });

  it('should sent DELETE request to remove todo', () => {
    service.deleteTodo(todo.id).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/api/todoItems/${todo.id}`);
    expect(req.request.method).toEqual('DELETE');
  });


});
