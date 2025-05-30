import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import listStudentParentSlice from "./feature/listStudentParent";

const store = configureStore({
    reducer: {
        user: userSlice,
        listStudentParent: listStudentParentSlice,
    },

});

export default store;