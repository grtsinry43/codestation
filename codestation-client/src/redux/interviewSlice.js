import {createSlice} from "@reduxjs/toolkit";
import {getAllInterviewsByCategory} from "../api/interview";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getInterviewTitleAsync = createAsyncThunk(
    'interview/getInterviewTitle',
    async (_, thunkAPI) => {
        const response = await getAllInterviewsByCategory();
        thunkAPI.dispatch(initInterviewTitleList(response.data))
    }
);

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        interviewTitleList: [],
    },
    reducers: {
        initInterviewTitleList(state, action) {
            state.interviewTitleList = action.payload;
        }
    }
})

export const {initInterviewTitleList} = interviewSlice.actions;
export default interviewSlice.reducer;
