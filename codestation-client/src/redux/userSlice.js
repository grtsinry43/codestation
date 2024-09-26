import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {updateUser} from "../api/user";

export const updateUserInfoAsync = createAsyncThunk(
    "user/updateUserInfoAsync",
    async (payload, thunkApi) => {
        console.log(payload, 'payload~~');
        await updateUser(payload.userId, payload.newInfo);
        thunkApi.dispatch(updateUserInfo(payload.newInfo));
    }
);

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
        updateUserInfo: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                ...action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
                state.userInfo = {
                    ...state.userInfo,
                    ...action.payload
                };
            });
    }
});

export const {initUserInfo, changeLoginStatus, clearUserInfo, updateUserInfo} = userSlice.actions;
export default userSlice.reducer;
