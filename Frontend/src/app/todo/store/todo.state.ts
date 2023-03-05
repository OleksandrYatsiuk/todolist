import { TodoItemView } from "src/app/core/services/interfaces/todo.interface";

export interface TodoState {
    todos: TodoItemView[];
    created: boolean;
    updated: boolean;
}

export const initialState: TodoState = {
    todos: [],
    created: false,
    updated:false
};