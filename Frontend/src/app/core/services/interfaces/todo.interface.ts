export interface TodoItem {
    description: string;
    isCompleted: boolean;
}

export interface TodoItemView extends TodoItem {
    id: string;
}