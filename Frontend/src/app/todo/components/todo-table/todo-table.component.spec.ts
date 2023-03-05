import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { completeTodo, deleteTodo, updateTodo } from '../../store/todo.actions';
import { AppState } from '../../store/todo.selectors';

import { TodoTableComponent } from './todo-table.component';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;
  let store: Store<AppState>;
  const todo: TodoItemView = { id: '1', description: 'B', isCompleted: true };
  const initialState: AppState = { todos: { todos: [todo, { ...todo, description: 'A' }], created: true, updated: false } };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTableComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatIconModule
      ],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should sort todos by alphabetic order by description', (done: DoneFn) => {
      component.todos$.subscribe(results => {
        expect(results[0].description).toEqual('A');
        expect(results[1].description).toEqual('B');
        done();
      })
    });
  });

  describe('onDelete', () => {
    it('should dispatch delete action', () => {
      component.onDelete('123');
      expect(store.dispatch).toHaveBeenCalledWith(deleteTodo({ id: '123' }));
    });
  });

  describe('markAsCompleted', () => {
    it('should change isCompleted prop to false', () => {
      component.markAsCompleted(todo);
      expect(store.dispatch).toHaveBeenCalledWith(completeTodo({ id: todo.id, body: { ...todo, isCompleted: false } }));
    });
  });

  describe('editTodo', () => {
    it('should open edit dialog', () => {
      spyOn(component.dialog, 'open');
      component.editTodo(todo);
      expect(component.dialog.open).toHaveBeenCalled();
    });
  });

  describe('mouseHoverEvents', () => {
    it('should set highlighted row', () => {
      component.mouseOver('001');
      expect(component.highlightedRow).toEqual('001');
    });

    it('should remove highlighted row', () => {
      component.highlightedRow = '001';
      fixture.detectChanges();
      component.mouseOut();
      expect(component.highlightedRow).toBeUndefined();
    });
  });
});
