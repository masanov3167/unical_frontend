import { Auth, EditUser } from "./hookForm"
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

type usersByLimit = {
    users: userType[],
    total: number
}
export type returnGetTypeData = usersByLimit | null

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