import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      console.log('setUserInfo action payload:', action.payload.userId);
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    clearUserInfo(state) {
      state.role = null;
      state.userId = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
