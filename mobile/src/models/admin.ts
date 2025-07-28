// src/models/admin.ts

/**
 * Interface for a platform-wide message sent by an admin.
 */
export interface PlatformMessage {
  to: string;
  subject: string;
  message: string;
}
