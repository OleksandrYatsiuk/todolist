import { createReducer, on } from "@ngrx/store";
import { completeTodoSuccess, createTodoSuccess, deleteTodoSuccess, loadTodosSuccess, resetCreatingState, resetUpdatingState, updateTodoSuccess } from "./todo.actions";
import { initialState, TodoState } from "./todo.state";

export const todoReducer = createReducer(
    initialState,
    on(loadTodosSuccess, (state, { todos }): TodoState => ({ ...state, todos })),
    on(createTodoSuccess, (state, { todo }): TodoState => ({
        ...state,
        todos: [...state.todos, todo],
        created: true,
    })),
    on(updateTodoSuccess, (state, { todo }): TodoState => ({
        ...state,
        todos: state.todos.map(todoItem => todoItem.id === todo.id ? todo : todoItem),
        updated: true,
    })),
    on(completeTodoSuccess, (state, { todo }): TodoState => ({
        ...state,
        todos: state.todos.map(todoItem => todoItem.id === todo.id ? todo : todoItem),
        updated: false,
    })),
    on(resetUpdatingState, (state, { updated }): TodoState => ({ ...state, updated })),
    on(resetCreatingState, (state, { created }): TodoState => ({ ...state, created })),
    on(deleteTodoSuccess, (state, { id }) => ({
        ...state,
        todos: state.todos.slice().filter(todo => todo.id !== id)
    }))
);