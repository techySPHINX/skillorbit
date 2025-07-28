// src/api/user.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { UserProfile } from '../models/user';

/**
 * Fetches a user's profile by their ID.
 * @param userId - The ID of the user to fetch.
 * @returns The user's profile data.
 */
export const getUserProfile = (userId: string) => {
  return apiManager.get(API_ENDPOINTS.GET_USER(userId));
};

/**
 * Updates the current user's profile.
 * @param profileData - The updated profile data.
 * @returns The server's response.
 */
export const updateUserProfile = (profileData: Partial<UserProfile>) => {
  return apiManager.put(API_ENDPOINTS.UPDATE_USER, profileData);
};

/**
 * Updates the current user's profile photo.
 * @param photo - The new profile photo.
 * @returns The server's response.
 */
export const updateProfilePhoto = (photo: FormData) => {
  return apiManager.put(API_ENDPOINTS.UPDATE_PROFILE_PHOTO, photo, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
