import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoComponent } from '../components/edit-todo/edit-todo.component';
import { TodoTableComponent } from '../components/todo-table/todo-table.component';

import { TodoComponent } from './todo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/todo.selectors';
import { Store } from '@ngrx/store';
import { createTodo } from '../store/todo.actions';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store<AppState>;
  const initialState: AppState = { todos: { todos: [], created: true, updated: false } };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, TodoTableComponent, EditTodoComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSave', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    })

    it('should create Todo Item', () => {
      component.description.setValue('aaa');

      component.onSave();

      expect(store.dispatch).toHaveBeenCalledWith(createTodo({ todo: { isCompleted: false, description: 'aaa' } }));
    });

    it('should touch control and check validation', () => {
      component.description.setValue('');

      component.onSave();

      expect(component.description.touched).toBeTrue();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should clear description if todo was created', () => {
      spyOn(component.description, 'reset');
      component.ngOnInit();

      component.description.setValue('Todo # 1');
      component.onSave();
      expect(component.description.reset).toHaveBeenCalled();
    });
  });
});
