// src/api/swap.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { SwapRequest, SwapStatusUpdate, SwapMessage, SwapFeedback } from '../models/swap';

/**
 * Fetches all swaps for the current user.
 * @returns A list of swaps.
 */
export const getSwaps = () => {
  return apiManager.get(API_ENDPOINTS.GET_SWAPS);
};

/**
 * Requests a new swap.
 * @param swapData - The data for the new swap request.
 * @returns The server's response.
 */
export const requestSwap = (swapData: FormData) => {
  return apiManager.post(API_ENDPOINTS.REQUEST_SWAP, swapData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Updates the status of a swap.
 * @param swapId - The ID of the swap to update.
 * @param statusData - The new status data.
 * @returns The server's response.
 */
export const updateSwapStatus = (swapId: string, statusData: SwapStatusUpdate) => {
  return apiManager.put(API_ENDPOINTS.UPDATE_SWAP_STATUS(swapId), statusData);
};

/**
 * Sends a message in a swap.
 * @param swapId - The ID of the swap.
 * @param messageData - The message data.
 * @returns The server's response.
 */
export const sendSwapMessage = (swapId: string, messageData: SwapMessage) => {
  return apiManager.post(API_ENDPOINTS.SEND_SWAP_MESSAGE(swapId), messageData);
};

/**
 * Adds feedback to a swap.
 * @param swapId - The ID of the swap.
 * @param feedbackData - The feedback data.
 * @returns The server's response.
 */
export const addSwapFeedback = (swapId: string, feedbackData: SwapFeedback) => {
  return apiManager.post(API_ENDPOINTS.ADD_SWAP_FEEDBACK(swapId), feedbackData);
};
