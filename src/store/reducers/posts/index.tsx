import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../types/posts";


type State = {
    posts: IPost[],
    total: number
};

const initialState: State = {
    posts: [],
    total: 0
};

const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setAll: (state, action: PayloadAction<{ posts: IPost[], total: number }>) => {
            state.posts = action.payload.posts;
            state.total = action.payload.total
            return state
        },
        deletePost: (state, action: PayloadAction<number>) => {
            const filter = state.posts.filter(u => u.id !== action.payload);
            state.posts = filter
            state.total -= 1
            return state
        },
        updatePost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload
            const filter = state.posts.map(u => {
                if (u.id === post.id) {
                    return post
                } else {
                    return u
                }
            })
            state.posts = filter
            return state
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            const post = action.payload
            state.posts.unshift(post)
            state.total += 1
            return state
        },

    }
});

export const { setAll, deletePost, updatePost, addPost } = PostSlice.actions;
export default PostSlice.reducer;
