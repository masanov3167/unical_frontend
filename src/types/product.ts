
export type IProduct = {
    id: number,
    title: string,
    description: string,
    price: number,
    rating: number,
    brand: number,
    category: number,
    thumbnail: string,
    images:string[]
}

export type EditIProduct = {
    title: string,
    description: string,
    price: number,
    rating: number,
    brand: number,
    category: number,
    thumbnail: string,
}