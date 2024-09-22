import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import typeListReducer from "./typeListSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        typeList: typeListReducer,
    }
});
