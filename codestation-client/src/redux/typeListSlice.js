import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getType} from "../api/type";

export const getTypeListAsync = createAsyncThunk(
    "type/getTypeList",
    async () => {
        const response = await getType();
        // 填充返回的数据到状态仓库
        return response.data;
    }
);


const typeListSlice = createSlice({
    name: "typeList",
    initialState: {
        typeList: [], // 存储所有的类型
        issueTypeId: "all",
        bookTypeId: "all",
    },
    reducers: {
        changeIssueTypeId: (state, {payload}) => {
            state.issueTypeId = payload;
        },
        changeBookTypeId: (state, {payload}) => {
            state.bookTypeId = payload;
        },
    },
    // 专门处理异步的 reducer
    extraReducers: (builder) => {
        builder.addCase(getTypeListAsync.fulfilled, (state, {payload}) => {
            state.typeList = payload;
        });
    },
});

export const {changeIssueTypeId, changeBookTypeId} = typeListSlice.actions;
export default typeListSlice.reducer;
