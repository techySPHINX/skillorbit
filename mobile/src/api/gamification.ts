
import api from './api';

export const getLeaderboard = async () => {
  const response = await api.get('/gamification/leaderboard');
  return response.data;
};

export const getAllBadges = async () => {
  const response = await api.get('/gamification/badges');
  return response.data;
};
