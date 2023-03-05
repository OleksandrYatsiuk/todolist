import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { disallowedWords, hasError } from 'src/app/utils/validators.util';
import { resetUpdatingState, updateTodo } from '../../store/todo.actions';
import { AppState, selectWasTodoUpdated } from '../../store/todo.selectors';

interface DialogData {
  todo: TodoItemView;
}

@UntilDestroy()
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  public isUpdated$: Observable<boolean> = this.store.select(selectWasTodoUpdated);

  public form!: FormGroup;

  public hasError = hasError;

  public constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Optional() private dialogRef: MatDialogRef<EditTodoComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  public ngOnInit(): void {
    this.initForm(this.data.todo);

    this.isUpdated$.pipe(
      untilDestroyed(this),
      filter(result => !!result),
    )
      .subscribe(() => {
        this.dialogRef.close(true);
        this.store.dispatch(resetUpdatingState({ updated: false }));
      });
  }

  private initForm(item?: TodoItemView): void {
    this.form = this.formBuilder.group({
      id: [item?.id, []],
      isCompleted: [item?.isCompleted, [Validators.required]],
      description: [item?.description, [Validators.required, disallowedWords(['cat', 'dog', 'yes', 'no'])]],
    })
  }

  public onUpdateTodo(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(updateTodo({ id: this.form.value.id, body: this.form.value }));
    }
  }

  public get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
