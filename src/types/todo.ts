export type ITodo = {
    id: number,
    todo:string,
    completed: boolean,
    userId: number
}

export type AddITodo = {
    todo:string,
    completed: boolean,
    userId: number
}

export type EditITodo = {
    todo:string,
    completed: boolean,
}