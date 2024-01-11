export type IPost = {
    id: number,
    title: string,
    body: string,
    tags: string[]
}

export type AddIPost = {
    userId: number,
    title: string,
    body: string,
    tags: string[]
}

export type EditIPost = {
    title: string,
    body: string,
    tags: string[]
}
