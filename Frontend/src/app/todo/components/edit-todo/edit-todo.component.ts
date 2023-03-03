import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { TodoItemView } from 'src/app/core/services/interfaces/todo.interface';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { disallowedWords, hasError } from 'src/app/utils/validators.util';

export interface DialogData {
  todo: TodoItemView;
}

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  public form!: FormGroup;

  public hasError = hasError;

  public constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Optional() private dialogRef: MatDialogRef<EditTodoComponent>,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this.initForm(this.data.todo);
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
      this.todoService.updateTodo(this.form.value.id, this.form.value)
        .pipe(catchError(e => {
          this.snackBar.open(e.error);
          return EMPTY;
        }))
        .subscribe((updatedTodo) => {
          this.dialogRef.close(updatedTodo);
        });
    }
  }

  public get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
