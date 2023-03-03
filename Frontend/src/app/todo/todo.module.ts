import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [{ path: '', component: TodoComponent }]

@NgModule({
  declarations: [
    TodoTableComponent,
    TodoComponent,
    EditTodoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class TodoModule { }
