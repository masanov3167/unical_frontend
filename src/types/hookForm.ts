export type Auth ={
    username:string,
    password:string
}
export type EditUser = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
}