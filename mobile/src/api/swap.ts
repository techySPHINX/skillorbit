import api from './api';

export const requestSwap = async (swapData) => {
  const response = await api.post('/swaps', swapData);
  return response.data;
};

export const listSwaps = async () => {
  const response = await api.get('/swaps');
  return response.data;
};

export const changeSwapStatus = async (id, status) => {
  const response = await api.put(`/swaps/${id}/status`, { status });
  return response.data;
};

export const sendSwapMessage = async (id, content) => {
  const response = await api.post(`/swaps/${id}/message`, { content });
  return response.data;
};

export const addFeedbackToSwap = async (id, feedbackId) => {
  const response = await api.post(`/swaps/${id}/feedback`, { feedbackId });
  return response.data;
};