import api from './api';

export const listNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const readNotification = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};