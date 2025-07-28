// src/models/swap.ts

/**
 * Interface for a swap request.
 */
export interface SwapRequest {
  responder: string; // User ID
  skillOffered: string; // Skill ID
  skillWanted: string; // Skill ID
  scheduledTime?: Date;
}

/**
 * Interface for updating the status of a swap.
 */
export interface SwapStatusUpdate {
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

/**
 * Interface for a message in a swap chat.
 */
export interface SwapMessage {
  content: string;
}

/**
 * Interface for a full swap object.
 */
export interface Swap {
  _id: string;
  requester: string; // User ID of the requester
  responder: string; // User ID of the responder
  skillOffered: string; // Skill ID offered by requester
  skillWanted: string; // Skill ID wanted by requester
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  scheduledTime?: Date;
  createdAt: string;
}

/**
 * Interface for adding feedback to a swap.
 */
export interface SwapFeedback {
  feedbackId: string;
}
