import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications, type Notification } from "../api/notification"; 

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    const res = await fetchNotifications();
    return res.notifications;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default notificationSlice.reducer;
