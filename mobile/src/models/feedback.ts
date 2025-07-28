// src/models/feedback.ts

/**
 * Interface for feedback left by a user.
 */
export interface Feedback {
  swap: string; // Swap ID
  toUser: string; // User ID
  rating: number;
  comment?: string;
}
