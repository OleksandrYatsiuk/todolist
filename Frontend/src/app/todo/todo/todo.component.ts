import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { disallowedWords, hasError } from 'src/app/utils/validators.util';
import { createTodo, loadTodos, resetCreatingState } from '../store/todo.actions';
import { AppState, selectTodos, selectWasTodoCreated } from '../store/todo.selectors';

@UntilDestroy()
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  public todos$: Observable<TodoItemView[]> = this.store.select(selectTodos);

  public isCreated$: Observable<boolean> = this.store.select(selectWasTodoCreated);

  public description = new FormControl('', [Validators.required, disallowedWords(['cat', 'dog', 'yes', 'no'])]);

  public hasError = hasError;

  public constructor(private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(loadTodos());

    this.isCreated$.pipe(
      untilDestroyed(this),
      filter((result) => !!result))
      .subscribe(() => {
        this.description.reset();
        this.store.dispatch(resetCreatingState({ created: false }));

      });
  }

  public onSave(): void {
    this.description.markAllAsTouched();

    if (this.description.valid) {
      this.store.dispatch(createTodo({ todo: { isCompleted: false, description: <string>this.description.value } }));
    }
  }
}
