import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';

import { EditTodoComponent } from './edit-todo.component';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;
  let todoService: TodoService;
  const snackBar: MatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  const dialogRef: MatDialogRef<EditTodoComponent> = jasmine.createSpyObj('MatDialogRef', ['close']);
  const todo: TodoItemView = { id: '1', description: 'Description', isCompleted: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    component.data = { todo };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.description).toBeDefined();
  });

  describe('onUpdateTodo', () => {
    it('should update todo Item', () => {
      spyOn(todoService, 'updateTodo').and.returnValue(of(todo));
      component.onUpdateTodo();
      expect(todoService.updateTodo).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should handle backend error', () => {
      spyOn(todoService, 'updateTodo').and.returnValue(throwError(new Error('Error')));
      component.onUpdateTodo();
      expect(todoService.updateTodo).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
