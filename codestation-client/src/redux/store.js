import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import typeListReducer from "./typeListSlice";
import interviewReducer from "./interviewSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        typeList: typeListReducer,
        interview: interviewReducer,
    }
});
