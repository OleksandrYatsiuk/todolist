import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export interface AppState {
    todos: TodoState;
}


export const selectFeature = (state: AppState): TodoState => state.todos;

export const selectTodos = createSelector(
    selectFeature,
    (state: TodoState) => state.todos.slice().sort(((a, b) => a.description.localeCompare(b.description))),
);

export const selectWasTodoCreated = createSelector(selectFeature, (state: TodoState) => state.created);
export const selectWasTodoUpdated = createSelector(selectFeature, (state: TodoState) => state.updated);