import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listStudentParent: []
}

const listStudentParentSlice = createSlice({
    name: "listStudentParent",
    initialState,
    reducers: {
        setListStudentParent(state, action) {
            console.log("setListStudentParent action payload:", action.payload);
            state.listStudentParent = action.payload;
        },
        clearListStudentParent(state) {
            state.listStudentParent = [];
        }
    }
})

export const { setListStudentParent, clearListStudentParent } = listStudentParentSlice.actions;

export default listStudentParentSlice.reducer;