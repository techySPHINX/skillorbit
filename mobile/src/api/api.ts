
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the baseURL to your backend's address
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials ? credentials.password : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
