// src/services/authService.ts

import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'auth_token';

/**
 * Securely stores the authentication token.
 * @param token - The token to store.
 */
export const setToken = async (token: string) => {
  await Keychain.setGenericPassword(TOKEN_KEY, token);
};

/**
 * Retrieves the authentication token from secure storage.
 * @returns The token, or null if it doesn't exist.
 */
export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};

/**
 * Clears the authentication token from secure storage.
 */
export const clearToken = async () => {
  await Keychain.resetGenericPassword();
};
