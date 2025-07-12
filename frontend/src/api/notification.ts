import { api } from "./axios";

export const fetchNotifications = () => api.get("/notifications");

export const markNotificationRead = (id: string) =>
  api.put(`/notifications/${id}/read`);
