import { createAction, props } from '@ngrx/store';
import { TodoItem, TodoItemView } from 'src/app/core/services/interfaces/todo.interface';

export const createTodo = createAction(
    '[Todo API] Create Todo',
    props<{ todo: TodoItem }>()
);

export const createTodoSuccess = createAction(
    '[Todo API] Create Todo Success',
    props<{ todo: TodoItemView }>()
);

export const loadTodos = createAction('[Todo API] Load Todos');

export const loadTodosSuccess = createAction(
    '[Todo API] Load Todos Success',
    props<{ todos: TodoItemView[] }>()
);

export const deleteTodo = createAction(
    '[Todo API] Delete Todo',
    props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
    '[Todo API] Delete Todo Success',
    props<{ id: string }>()
);

export const updateTodo = createAction(
    '[Todo API] Update Todo',
    props<{ id: string, body: TodoItem }>()
);

export const updateTodoSuccess = createAction(
    '[Todo API] Update Todo Success',
    props<{ todo: TodoItemView }>()
);

export const completeTodo = createAction(
    '[Todo API] Mark Todo as Completed',
    props<{ id: string, body: TodoItem }>()
);

export const completeTodoSuccess = createAction(
    '[Todo API] Replace completed Todo',
    props<{ todo: TodoItemView }>()
);

export const resetUpdatingState = createAction(
    '[Todo APP] Mark todo as not Updated',
    props<{ updated: boolean }>()
);

export const resetCreatingState = createAction(
    '[Todo APP] mark todo as not created',
    props<{ created: boolean }>()
);