export type IAuth ={
    username:string,
    password:string
}
export type IEditUser = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
}

export enum IGender {
    Male = 'male',
    Female = 'female',
}