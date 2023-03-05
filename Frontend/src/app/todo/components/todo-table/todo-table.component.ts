import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { deleteTodo, updateTodo } from '../../store/todo.actions';
import { AppState, selectTodos } from '../../store/todo.selectors';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTableComponent {
  public todos$: Observable<TodoItemView[]> = this.store.select(selectTodos);

  public highlightedRow!: string | undefined;

  public constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  public onDelete(id: string): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  public markAsCompleted(todo: TodoItemView): void {
    this.store.dispatch(updateTodo({ id: todo.id, body: { ...todo, isCompleted: !todo.isCompleted } }))
  }

  public editTodo(todo: TodoItemView): void {
    this.dialog.open(EditTodoComponent, { data: { todo } });
  }

  public mouseOver(id: string): void {
    this.highlightedRow = id;
  }
  public mouseOut(): void {
    this.highlightedRow = undefined;
  }
}
