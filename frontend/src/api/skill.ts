import { api } from "./axios";

export interface Skill {
  _id: string;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  createdBy: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FetchSkillsResponse {
  skills: Skill[];
}

export const fetchSkills = async (): Promise<FetchSkillsResponse> => {
  const response = await api.get<FetchSkillsResponse>("/skills");
  return response.data;
};

export interface AddSkillData {
  name: string;
  category?: string;
  description?: string;
  image?: File;
}

export interface AddSkillResponse {
  skill: Skill;
}

export const addSkill = async (
  data: AddSkillData
): Promise<AddSkillResponse> => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.category) formData.append("category", data.category);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);

  const response = await api.post<AddSkillResponse>("/skills", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
