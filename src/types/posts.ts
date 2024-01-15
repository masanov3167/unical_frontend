export type IPost = {
    id: number,
    title: string,
    body: string,
    tags: string[]
}

export type IAddPost = {
    userId: number,
    title: string,
    body: string,
    tags: string[]
}

export type IEditPost = {
    title: string,
    body: string,
    tags: string[]
}
