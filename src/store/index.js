// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Asegúrate de que la ruta es correcta

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
