// src/api/apiManager.ts

import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { getToken } from '../services/authService'; // Assuming you have a service to get the token

/**
 * The main Axios instance for the application.
 *
 * This instance is configured with the base URL and interceptors to handle
 * authentication tokens and global error handling.
 */
const apiManager = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request
apiManager.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiManager.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes or log them
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiManager;
