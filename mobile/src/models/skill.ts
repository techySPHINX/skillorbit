// src/models/skill.ts

/**
 * Interface for a skill.
 */
export interface Skill {
  _id: string;
  name: string;
  category?: string;
  description?: string;
  image?: string;
}
