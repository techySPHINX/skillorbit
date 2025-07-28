// src/models/auth.ts

/**
 * Interface for user login credentials.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface for new user registration data.
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
