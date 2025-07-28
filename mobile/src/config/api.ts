// src/config/api.ts

/**
 * API configuration for the SkillOrbit application.
 *
 * This file centralizes the API endpoint settings, making it easy to switch between
 * development, staging, and production environments.
 */

// TODO: Replace with your production backend URL
const PROD_API_URL = 'https://skillorbit-api.com';

// Use this for local development
const DEV_API_URL = 'http://localhost:3000';

// Set to true for production, false for development
const isProduction = process.env.NODE_ENV === 'production';

/**
 * The base URL for all API requests.
 *
 * Switches between the development and production URLs based on the environment.
 */
export const API_BASE_URL = isProduction ? PROD_API_URL : DEV_API_URL;

/**
 * API endpoint paths.
 *
 * Using a centralized object for endpoints makes them easier to manage and update.
 */
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_ME: '/auth/me',

  // Users
  GET_USER: (userId: string) => `/users/${userId}`,
  UPDATE_USER: '/users',
  UPDATE_PROFILE_PHOTO: '/users/profile/photo',

  // Skills
  GET_SKILLS: '/skills',
  ADD_SKILL: '/skills',
  DELETE_SKILL: (skillId: string) => `/skills/${skillId}`,

  // Swaps
  GET_SWAPS: '/swaps',
  REQUEST_SWAP: '/swaps',
  UPDATE_SWAP_STATUS: (swapId: string) => `/swaps/${swapId}/status`,
  SEND_SWAP_MESSAGE: (swapId: string) => `/swaps/${swapId}/message`,
  ADD_SWAP_FEEDBACK: (swapId: string) => `/swaps/${swapId}/feedback`,

  // Feedback
  GET_USER_FEEDBACK: (userId: string) => `/feedback/user/${userId}`,
  LEAVE_FEEDBACK: '/feedback',

  // Notifications
  GET_NOTIFICATIONS: '/notifications',
  MARK_NOTIFICATION_READ: (notificationId: string) => `/notifications/${notificationId}/read`,

  // Admin
  ADMIN_GET_USERS: '/admin/users',
  ADMIN_BAN_USER: (userId: string) => `/admin/users/${userId}/ban`,
  ADMIN_UNBAN_USER: (userId: string) => `/admin/users/${userId}/unban`,
  ADMIN_GET_ANALYTICS: '/admin/analytics',
  ADMIN_SEND_MESSAGE: '/admin/message',
  ADMIN_GET_LOGS: '/admin/logs',
};
