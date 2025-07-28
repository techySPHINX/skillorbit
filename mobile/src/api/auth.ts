// src/api/auth.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { LoginCredentials, RegisterData } from '../models/auth';

/**
 * Logs in a user.
 * @param credentials - The user's login credentials.
 * @returns The server's response, typically including a token.
 */
export const login = (credentials: LoginCredentials) => {
  return apiManager.post(API_ENDPOINTS.LOGIN, credentials);
};

/**
 * Registers a new user.
 * @param data - The user's registration data.
 * @returns The server's response, typically including the new user object.
 */
export const register = (data: RegisterData) => {
  return apiManager.post(API_ENDPOINTS.REGISTER, data);
};

/**
 * Fetches the current authenticated user's profile.
 * @returns The user's profile data.
 */
export const getMe = () => {
  return apiManager.get(API_ENDPOINTS.GET_ME);
};
