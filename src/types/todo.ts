export type ITodo = {
    id: number,
    todo:string,
    completed: boolean,
    userId: number
}

export type IAddTodo = {
    todo:string,
    completed: boolean,
    userId: number
}

export type IEditTodo = {
    todo:string,
    completed: boolean,
}