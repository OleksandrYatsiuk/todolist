import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { disallowedWords, hasError } from 'src/app/utils/validators.util';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  public todos: TodoItemView[] = [];

  public description = new FormControl('', [Validators.required, disallowedWords(['cat', 'dog', 'yes', 'no'])]);

  public hasError = hasError;

  public constructor(
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.queryTodoList();
  }

  public onUpdateList(): void {
    this.queryTodoList();
  }

  private queryTodoList(): void {
    this.todoService.getTodoList().pipe(map(todos => todos.sort((a, b) => a.description.localeCompare(b.description))))
      .subscribe(todos => {
        this.todos = todos;
        this.changeDetectorRef.detectChanges();
      })
  }

  public onDeletedItem(id: string): void {
    this.todoService.deleteTodo(id)
      .pipe(catchError(e => {
        this.snackBar.open(e.error);
        return EMPTY;
      }))
      .subscribe(() => {
        this.queryTodoList();
        this.snackBar.open('Todo was deleted successfully!');
        this.changeDetectorRef.detectChanges();
      })
  }

  public onSave(): void {
    this.description.markAllAsTouched();

    if (this.description.valid) {
      this.todoService.createTodo({ isCompleted: false, description: <string>this.description.value })
        .pipe(catchError(e => {
          this.snackBar.open(e.error);
          return EMPTY;
        }))
        .subscribe(() => {
          this.onClearDescription();
          this.queryTodoList();
          this.snackBar.open('Todo was created successfully!');
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  public onClearDescription(): void {
    this.description.reset();
  }
}
