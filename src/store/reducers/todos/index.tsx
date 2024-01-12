import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../../types/todo";


type State = {
    todos: ITodo[],
    total: number
};

const initialState: State = {
    todos: [],
    total: 0
};

const TodoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setAll: (state, action: PayloadAction<{ todos: ITodo[], total: number }>) => {
            state.todos = action.payload.todos;
            state.total = action.payload.total
            return state
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const filter = state.todos.filter(u => u.id !== action.payload);
            state.todos = filter
            state.total -= 1
            return state
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            const todo = action.payload
            const filter = state.todos.map(u => {
                if (u.id === todo.id) {
                    return todo
                } else {
                    return u
                }
            })
            state.todos = filter
            return state
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            const todo = action.payload
            state.todos.unshift(todo)
            state.total += 1
            return state
        }
    }
});

export const { setAll, deleteTodo, updateTodo, addTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
