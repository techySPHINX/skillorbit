
import api from './api';

export const listUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const banUser = async (id) => {
  const response = await api.put(`/admin/users/${id}/ban`);
  return response.data;
};

export const unbanUser = async (id) => {
  const response = await api.put(`/admin/users/${id}/unban`);
  return response.data;
};

export const getAnalyticsReport = async () => {
  const response = await api.get('/admin/analytics');
  return response.data;
};

export const sendPlatformMessage = async (message) => {
  const response = await api.post('/admin/message', message);
  return response.data;
};

export const viewAdminLogs = async () => {
  const response = await api.get('/admin/logs');
  return response.data;
};
