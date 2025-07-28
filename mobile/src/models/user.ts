// src/models/user.ts

/**
 * Interface for a user profile.
 */
export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  location?: string;
  availability?: string;
  skillsOffered: string[]; // Array of Skill IDs
  skillsWanted: string[]; // Array of Skill IDs
  isPrivate: boolean;
  roles: ('user' | 'admin')[];
}
