import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';

import { TodoTableComponent } from './todo-table.component';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;
  let todoService: TodoService;

  const todo: TodoItemView = { id: '1', description: 'Description', isCompleted: true };
  const snackBar: MatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTableComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editTodo', () => {
    it('should open edit dialog', () => {
      spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<TodoTableComponent>);
      component.editTodo(todo);
      expect(snackBar.open).toHaveBeenCalled();
      expect(component.dialog.open).toHaveBeenCalled();
    });
  })

  describe('markAsCompleted', () => {
    it('should mark todo as completed', () => {
      spyOn(todoService, 'updateTodo').and.returnValue(of(todo))
      component.markAsCompleted(todo);
      expect(todoService.updateTodo).toHaveBeenCalledWith(todo.id, { ...todo, isCompleted: !todo.isCompleted });
    });
    it('should handle backend error todo as completed', () => {
      spyOn(todoService, 'updateTodo').and.returnValue(throwError(() => 'Error'));
      component.markAsCompleted(todo);
      expect(snackBar.open).toHaveBeenCalled();
    });
  })

  describe('onDelete', () => {
    it('should emit delete', () => {
      spyOn(component.delete, 'emit');
      component.onDelete('1');
      expect(component.delete.emit).toHaveBeenCalledWith('1');

    })
  })
});
