// src/models/notification.ts

/**
 * Interface for a user notification.
 */
export interface Notification {
  _id: string;
  user: string; // User ID
  message: string;
  isRead: boolean;
  createdAt: string;
}
