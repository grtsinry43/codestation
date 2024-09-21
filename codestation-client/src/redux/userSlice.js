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
        changeLoginStatus: (state, action) => {
            state.isLogin = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = {};
        },
    },
});

export const {initUserInfo, changeLoginStatus, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;
