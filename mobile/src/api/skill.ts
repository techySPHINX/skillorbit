import api from './api';

export const addSkill = async (skillData) => {
  const response = await api.post('/skills', skillData);
  return response.data;
};

export const listSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

export const removeSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};