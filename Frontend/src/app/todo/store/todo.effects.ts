import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { createTodo, createTodoSuccess, deleteTodo, deleteTodoSuccess, loadTodos, loadTodosSuccess, resetUpdatingState, updateTodo, updateTodoSuccess } from './todo.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TodoEffects {

    public createTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createTodo),
            mergeMap(action => this.todoService.createTodo({ ...action.todo, isCompleted: false })
                .pipe(
                    map(todo => {
                        this.snackBar.open('Todo was created successfully!');
                        return createTodoSuccess({ todo });
                    }
                    ),
                    catchError(e => {
                        this.snackBar.open(e.error);
                        return EMPTY;
                    })
                ))
        )
    }
    );

    public updateTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateTodo),
            mergeMap(action => this.todoService.updateTodo(action.id, action.body)
                .pipe(
                    map(todo => {
                        this.snackBar.open('Todo was updated successfully!');
                        resetUpdatingState({ updated: true })
                        return updateTodoSuccess({ todo });
                    }
                    ),
                    catchError(e => {
                        this.snackBar.open(e.error);
                        return EMPTY;
                    })
                ))
        )
    }
    );

    public deleteTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteTodo),
            mergeMap(action => this.todoService.deleteTodo(action.id)
                .pipe(
                    map(() => {
                        this.snackBar.open('Todo was deleted successfully!');
                        return deleteTodoSuccess({ id: action.id });
                    }
                    ),
                    catchError(e => {
                        this.snackBar.open(e.error);
                        return EMPTY;
                    })
                ))
        )
    }
    );

    public loadTodos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadTodos),
            mergeMap(() => this.todoService.getTodoList()
                .pipe(
                    map(todos => loadTodosSuccess({ todos })
                    ),
                    catchError(e => {
                        this.snackBar.open(e.error);
                        return EMPTY;
                    })
                ))
        )
    }
    );


    public constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private snackBar: MatSnackBar
    ) { }
}
