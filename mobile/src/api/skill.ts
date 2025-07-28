// src/api/skill.ts

import apiManager from './apiManager';
import { API_ENDPOINTS } from '../config/api';
import { Skill } from '../models/skill';

/**
 * Fetches all skills.
 * @returns A list of all skills.
 */
export const getSkills = () => {
  return apiManager.get(API_ENDPOINTS.GET_SKILLS);
};

/**
 * Adds a new skill.
 * @param skillData - The data for the new skill.
 * @returns The server's response.
 */
export const addSkill = (skillData: FormData) => {
  return apiManager.post(API_ENDPOINTS.ADD_SKILL, skillData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Deletes a skill by its ID.
 * @param skillId - The ID of the skill to delete.
 * @returns The server's response.
 */
export const deleteSkill = (skillId: string) => {
  return apiManager.delete(API_ENDPOINTS.DELETE_SKILL(skillId));
};
