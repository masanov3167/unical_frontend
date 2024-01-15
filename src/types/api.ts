import { IPost } from "./posts"
import { IProduct } from "./product"
import { ITodo } from "./todo"
import { IUser } from "./user"

//all axios api return type 
export type IApiReturn<T> = {
    ok:boolean,
    data: T | null,
    msg: string
}

export type IUsersLimited = {
    users: IUser[],
    total: number
}
export type IProductsLimited = {
    products: IProduct[],
    total: number
}
export type IPostsLimited = {
    posts: IPost[],
    total: number
}
export type ITodosLimited = {
    todos: ITodo[],
    total: number
}