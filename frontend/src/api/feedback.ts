import { api } from "./axios";

export interface LeaveFeedbackData {
  swap: string;
  toUser: string;
  rating: number;
  comment?: string;
}

export interface Feedback {
  _id: string;
  fromUser: {
    _id: string;
    username: string;
  };
  toUser: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveFeedbackResponse {
  feedback: Feedback;
}

export const leaveFeedback = async (
  data: LeaveFeedbackData
): Promise<LeaveFeedbackResponse> => {
  const response = await api.post<LeaveFeedbackResponse>("/feedback", data);
  return response.data;
};

export interface FetchUserFeedbackResponse {
  feedbacks: Feedback[];
}

export const fetchUserFeedback = async (
  userId: string
): Promise<FetchUserFeedbackResponse> => {
  const response = await api.get<FetchUserFeedbackResponse>(
    `/feedback/user/${userId}`
  );
  return response.data;
};
