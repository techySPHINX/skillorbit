import { api } from "./axios";

export interface PlatformMessagePayload {
  to: string;
  subject: string;
  message: string;
  asset?: File;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

export interface AnalyticsReport {
  userCount: number;
  swapStats: {
    total: number;
    completed: number;
  };
  popularSkills: {
    name: string;
    count: number;
  }[];
}

export interface AdminLog {
  _id: string;
  action: string;
  performedBy: {
    _id: string;
    username: string;
    email: string;
  };
  targetUser?: {
    _id: string;
    username: string;
    email: string;
  };
  details: string;
  createdAt: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<{ users: User[] }>("/admin/users");
  return response.data.users;
};

export const banUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.put(`/admin/users/${id}/ban`);
  return response.data;
};

export const unbanUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.put(`/admin/users/${id}/unban`);
  return response.data;
};

export const fetchAnalytics = async (): Promise<AnalyticsReport> => {
  const response = await api.get<AnalyticsReport>("/admin/analytics");
  return response.data;
};

export const sendPlatformMessage = async (
  data: PlatformMessagePayload
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("to", data.to);
  formData.append("subject", data.subject);
  formData.append("message", data.message);
  if (data.asset) {
    formData.append("asset", data.asset);
  }

  const response = await api.post("/admin/message", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchAdminLogs = async (): Promise<AdminLog[]> => {
  const response = await api.get<{ logs: AdminLog[] }>("/admin/logs");
  return response.data.logs;
};
