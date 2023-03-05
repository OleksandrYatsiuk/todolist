import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { updateTodo } from '../../store/todo.actions';
import { AppState } from '../../store/todo.selectors';

import { EditTodoComponent } from './edit-todo.component';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;
  let todoService: TodoService;
  const dialogRef: MatDialogRef<EditTodoComponent> = jasmine.createSpyObj('MatDialogRef', ['close']);
  const todo: TodoItemView = { id: '1', description: 'Description', isCompleted: true };
  let store: Store<AppState>;
  const initialState: AppState = { todos: { todos: [], created: false, updated: true } };

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
        { provide: MatDialogRef, useValue: dialogRef },
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    component.data = { todo };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.description).toBeDefined();
  });


  describe('ngOnInit', () => {
    it('should close dialog ref if todo was updated', () => {
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    })
  });

  describe('onUpdateTodo', () => {
    it('should update todo Item', () => {
      spyOn(store, 'dispatch');
      component.onUpdateTodo();
      expect(store.dispatch).toHaveBeenCalledWith(updateTodo({ id: todo.id, body: { ...todo } }));
    });
  });
});
