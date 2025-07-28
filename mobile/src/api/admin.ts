// src/api/admin.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { PlatformMessage } from '../models/admin';

/**
 * Fetches all users (admin only).
 * @returns A list of all users.
 */
export const getUsers = () => {
  return apiManager.get(API_ENDPOINTS.ADMIN_GET_USERS);
};

/**
 * Bans a user by their ID (admin only).
 * @param userId - The ID of the user to ban.
 * @returns The server's response.
 */
export const banUser = (userId: string) => {
  return apiManager.put(API_ENDPOINTS.ADMIN_BAN_USER(userId));
};

/**
 * Unbans a user by their ID (admin only).
 * @param userId - The ID of the user to unban.
 * @returns The server's response.
 */
export const unbanUser = (userId: string) => {
  return apiManager.put(API_ENDPOINTS.ADMIN_UNBAN_USER(userId));
};

/**
 * Fetches analytics data (admin only).
 * @returns The analytics data.
 */
export const getAnalytics = () => {
  return apiManager.get(API_ENDPOINTS.ADMIN_GET_ANALYTICS);
};

/**
 * Sends a platform-wide message (admin only).
 * @param messageData - The message data.
 * @returns The server's response.
 */
export const sendPlatformMessage = (messageData: PlatformMessage) => {
  return apiManager.post(API_ENDPOINTS.ADMIN_SEND_MESSAGE, messageData);
};

/**
 * Fetches admin logs (admin only).
 * @returns The admin logs.
 */
export const getAdminLogs = () => {
  return apiManager.get(API_ENDPOINTS.ADMIN_GET_LOGS);
};
