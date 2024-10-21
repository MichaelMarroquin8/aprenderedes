// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  mode: "light",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    toggleColorMode(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { login, logout, toggleColorMode } = userSlice.actions;
export default userSlice.reducer;
