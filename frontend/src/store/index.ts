import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import skillReducer from "./skillSlice";
import swapReducer from "./swapSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    swaps: swapReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
