import { api } from "./axios";

export interface Notification {
  _id: string;
  user: string;
  message: string;
  type: "general" | "system" | "swap" | string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotificationsResponse {
  data: unknown;
  notifications: Notification[];
}

export const fetchNotifications =
  async (): Promise<FetchNotificationsResponse> => {
    const response = await api.get<FetchNotificationsResponse>(
      "/notifications"
    );
    return response.data;
  };

export interface MarkNotificationReadResponse {
  notification: Notification;
}

export const markNotificationRead = async (
  id: string
): Promise<MarkNotificationReadResponse> => {
  const response = await api.put<MarkNotificationReadResponse>(
    `/notifications/${id}/read`
  );
  return response.data;
};
