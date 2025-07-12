import { api } from "./axios";

export const leaveFeedback = (data: {
  swap: string;
  toUser: string;
  rating: number;
  comment?: string;
}) => api.post("/feedback", data);

export const fetchUserFeedback = (userId: string) =>
  api.get(`/feedback/user/${userId}`);
