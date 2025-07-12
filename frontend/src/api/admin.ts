import { api } from "./axios";

export const fetchUsers = () => api.get("/admin/users");

export const banUser = (id: string) => api.put(`/admin/users/${id}/ban`);

export const unbanUser = (id: string) => api.put(`/admin/users/${id}/unban`);

export const fetchAnalytics = () => api.get("/admin/analytics");

export const sendPlatformMessage = (data: {
  to: string;
  subject: string;
  message: string;
  asset?: File;
}) => {
  const formData = new FormData();
  formData.append("to", data.to);
  formData.append("subject", data.subject);
  formData.append("message", data.message);
  if (data.asset) formData.append("asset", data.asset);
  return api.post("/admin/message", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchAdminLogs = () => api.get("/admin/logs");
