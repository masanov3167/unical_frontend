import { Auth, EditUser } from "./hookForm"
import { IPost } from "./posts"
import { IProduct } from "./product"
import { ITodo } from "./todo"
import { userType } from "./user"

//post datas function tpes
export type returnPostType = {
    ok: boolean,
    data: returnPostTypeData,
    msg: string
}

export type returnPostTypeData = userType | null
export type postBodyType = Auth | any

//get datas function types
export type returnGetType = {
    ok: boolean,
    data: returnGetTypeData,
    msg: string
}

export type usersByLimit = {
    users: userType[],
    total: number
}
export type productsByLimit = {
    products: IProduct[],
    total: number
}
export type postsByLimit = {
    posts: IPost[],
    total: number
}
export type todosByLimit = {
    todos: ITodo[],
    total: number
}
export type returnGetTypeData = usersByLimit | productsByLimit | IProduct | postsByLimit | IPost | todosByLimit | ITodo | null

//delete datas function type
export type returnDeleteType = {
    ok: boolean,
    data: {id: number} | null,
    msg: string
}


//put datas function type
//post datas function tpes
export type returnPutType = {
    ok: boolean,
    data: returnPutTypeData,
    msg: string
}

export type returnPutTypeData = userType | null
export type putBodyType = EditUser | any