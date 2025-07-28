// src/redux/notificationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../models/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(notif => !notif.isRead).length;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload); // Add to the beginning
      if (!action.payload.isRead) {
        state.unreadCount++;
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(notif => notif._id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount--;
      }
    },
  },
});

export const { setNotifications, addNotification, markNotificationAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
