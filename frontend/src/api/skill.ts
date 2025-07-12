import { api } from "./axios";

export const fetchSkills = () => api.get("/skills");

export const addSkill = (data: {
  name: string;
  category?: string;
  description?: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.category) formData.append("category", data.category);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  return api.post("/skills", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteSkill = (id: string) => api.delete(`/skills/${id}`);
