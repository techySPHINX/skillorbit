import api from './api';

export const getProfile = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/users', profileData);
  return response.data;
};

export const updateProfilePhoto = async (photo) => {
  const formData = new FormData();
  formData.append('photo', photo);
  const response = await api.put('/users/profile/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const registerFCMToken = async (fcmToken) => {
  const response = await api.post('/users/fcm-token', { fcmToken });
  return response.data;
};