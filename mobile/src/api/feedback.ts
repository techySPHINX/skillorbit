// src/api/feedback.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { Feedback } from '../models/feedback';

/**
 * Fetches all feedback for a specific user.
 * @param userId - The ID of the user.
 * @returns A list of feedback for the user.
 */
export const getUserFeedback = (userId: string) => {
  return apiManager.get(API_ENDPOINTS.GET_USER_FEEDBACK(userId));
};

/**
 * Leaves feedback for a user.
 * @param feedbackData - The feedback data.
 * @returns The server's response.
 */
export const leaveFeedback = (feedbackData: Feedback) => {
  return apiManager.post(API_ENDPOINTS.LEAVE_FEEDBACK, feedbackData);
};
