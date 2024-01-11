import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../../types/user";
import { decodeJWT, getCookie } from "../../../utils/functions";


type State = {
    user?: userType,
    users: userType[],
    totalUsers: number
};

const token = getCookie("token");

const initialState: State = {
    user: token ? decodeJWT(token) : undefined,
    users: [],
    totalUsers: 0
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<userType>) => {
            state.user = action.payload
            return state
        },
        setAll: (state, action: PayloadAction<{ users: userType[], total: number }>) => {
            state.users = action.payload.users;
            state.totalUsers = action.payload.total
            return state
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            const filter = state.users.filter(u => u.id !== action.payload);
            state.users = filter
            state.totalUsers -= 1
            return state
        },
        updateUser: (state, action: PayloadAction<userType>) => {
            const user = action.payload
            const filter = state.users.map(u => {
                if (u.id === user.id) {
                    return user
                } else {
                    return u
                }
            })
            state.users = filter
            return state
        },
        addUser: (state, action: PayloadAction<userType>) => {
            const user = action.payload
            state.users.unshift(user)
            state.totalUsers += 1
            return state
        }
    }
});

export const { loginAction, setAll, deleteUser, updateUser, addUser } = userSlice.actions;
export default userSlice.reducer;
