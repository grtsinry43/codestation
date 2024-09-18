import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogin: false,
        userInfo: {},
    },
    reducers: {
        initUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        login: (state, action) => {
            state.isLogin = true;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.userInfo = {};
        },
    },
});

export const {initUserInfo, login, logout} = userSlice.actions;
export default userSlice.reducer;
