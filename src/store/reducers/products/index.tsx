import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/product";


type State = {
    product?: IProduct,
    products: IProduct[],
    total: number
};

const initialState: State = {
    products: [],
    total: 0
};

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAll: (state, action: PayloadAction<{ products: IProduct[], total: number }>) => {
            state.products = action.payload.products;
            state.total = action.payload.total
            return state
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const filter = state.products.filter(u => u.id !== action.payload);
            state.products = filter
            state.total -= 1
            return state
        },
        updateProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload
            const filter = state.products.map(u => {
                if (u.id === product.id) {
                    return product
                } else {
                    return u
                }
            })
            state.products = filter
            return state
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const user = action.payload
            state.products.unshift(user)
            state.total += 1
            return state
        },
        setProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload
            state.product = product
            return state
        }
    }
});

export const { setAll, deleteProduct, updateProduct, addProduct, setProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
