// src/api/notification.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';

/**
 * Fetches all notifications for the current user.
 * @returns A list of notifications.
 */
export const getNotifications = () => {
  return apiManager.get(API_ENDPOINTS.GET_NOTIFICATIONS);
};

/**
 * Marks a notification as read.
 * @param notificationId - The ID of the notification to mark as read.
 * @returns The server's response.
 */
export const markNotificationRead = (notificationId: string) => {
  return apiManager.put(API_ENDPOINTS.MARK_NOTIFICATION_READ(notificationId));
};
