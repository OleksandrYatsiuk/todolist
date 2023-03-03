import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoComponent } from '../components/edit-todo/edit-todo.component';
import { TodoTableComponent } from '../components/todo-table/todo-table.component';

import { TodoComponent } from './todo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: TodoService;
  const todo: TodoItemView = { id: '1', description: 'Description', isCompleted: true };
  const snackBar: MatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);


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
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get todos list', (done: DoneFn) => {
      spyOn(todoService, 'getTodoList').and.returnValue(of([todo, { ...todo, description: 'a11' }]));
      component.ngOnInit();

      component.todos$.subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
        expect(todoService.getTodoList).toHaveBeenCalled();
        done()
      });
    })
  });

  describe('onSave', () => {
    it('should create Todo Item', () => {
      spyOn(todoService, 'createTodo').and.returnValue(of(todo));
      component.description.setValue('aaa');

      component.onSave();

      expect(todoService.createTodo).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('should delete Todo Item', () => {
      spyOn(todoService, 'deleteTodo').and.returnValue(of(''));
      component.description.setValue('aaa');

      component.onDeletedItem('123');

      expect(todoService.deleteTodo).toHaveBeenCalled();
    });
  });

  describe('updateList', () => {
    it('should get list one again', () => {
      spyOn(todoService, 'getTodoList').and.returnValue(of([]));

      component.onUpdateList();

      expect(todoService.getTodoList).toHaveBeenCalled();
    });
  });
});
