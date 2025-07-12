import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications } from "../api/notification";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    const res = await fetchNotifications();
    return res.data.notifications;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [], loading: false },
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
