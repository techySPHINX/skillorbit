import { api } from "./axios";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  location?: string;
  availability?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
  isPrivate?: boolean;
  roles?: string[];
}

export interface GetUserProfileResponse {
  user: UserProfile;
}

export const getUserProfile = async (
  id: string
): Promise<GetUserProfileResponse> => {
  const response = await api.get<GetUserProfileResponse>(`/users/${id}`);
  return response.data;
};

export interface UpdateUserProfileData {
  username?: string;
  profilePhoto?: string;
  location?: string;
  availability?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
  isPrivate?: boolean;
}

export const updateUserProfile = async (
  data: UpdateUserProfileData
): Promise<{ user: UserProfile }> => {
  const response = await api.put<{ user: UserProfile }>("/users", data);
  return response.data;
};

export const updateProfilePhoto = async (
  file: File
): Promise<{ profilePhoto: string }> => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await api.put<{ profilePhoto: string }>(
    "/users/profile/photo",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
