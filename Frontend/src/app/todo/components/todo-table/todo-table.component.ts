import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, filter } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTableComponent {
  @Input() public items: TodoItemView[] = [];
  @Output() public delete = new EventEmitter<string>();
  @Output() public modified = new EventEmitter<TodoItemView>();

  public constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  public onDelete(id: string): void {
    this.delete.emit(id);
  }

  public markAsCompleted(todo: TodoItemView): void {
    this.todoService.updateTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted })
      .pipe(catchError(e => {
        this.snackBar.open(e.error);
        return EMPTY;
      }))
      .subscribe(updatedTodo => {
        this.snackBar.open('Todo was updated successfully!');
        this.modified.emit(updatedTodo);
      })
  }

  public editTodo(todo: TodoItemView): void {
    const ref = this.dialog.open(EditTodoComponent, { data: { todo } });

    ref.afterClosed().pipe(filter(result => !!result))
      .subscribe((updatedTodo) => {
        this.snackBar.open('Todo was updated successfully!');
        this.modified.emit(updatedTodo);
      })
  }
}
