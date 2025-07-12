import { api } from "./axios";

export const getUserProfile = (id: string) => api.get(`/users/${id}`);

export const updateUserProfile = (data: unknown) => api.put("/users", data);

export const updateProfilePhoto = (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);
  return api.put("/users/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
