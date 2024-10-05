import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
