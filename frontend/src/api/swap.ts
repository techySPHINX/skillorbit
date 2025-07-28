import { api } from "./axios";

export interface Swap {
  _id: string;
  requester: string;
  responder: string;
  skillOffered: string;
  skillWanted: string;
  scheduledTime?: string;
  image?: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  messages: SwapMessage[];
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwapMessage {
  sender: string;
  content: string;
  timestamp: string;
}

export interface CreateSwapData {
  responder: string;
  skillOffered: string;
  skillWanted: string;
  scheduledTime?: string;
  image?: File;
}

export interface CreateSwapResponse {
  swap: Swap;
}

export const createSwap = async (
  data: CreateSwapData
): Promise<CreateSwapResponse> => {
  const formData = new FormData();
  formData.append("responder", data.responder);
  formData.append("skillOffered", data.skillOffered);
  formData.append("skillWanted", data.skillWanted);
  if (data.scheduledTime) formData.append("scheduledTime", data.scheduledTime);
  if (data.image) formData.append("image", data.image);

  const response = await api.post<CreateSwapResponse>("/swaps", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export interface FetchSwapsResponse {
  swaps: Swap[];
}

export const fetchSwaps = async (
  status?: string
): Promise<FetchSwapsResponse> => {
  const response = await api.get<FetchSwapsResponse>("/swaps", {
    params: status ? { status } : {},
  });
  return response.data;
};

export interface UpdateSwapStatusResponse {
  swap: Swap;
}

export const updateSwapStatus = async (
  id: string,
  status: "pending" | "accepted" | "rejected" | "completed"
): Promise<UpdateSwapStatusResponse> => {
  const response = await api.put<UpdateSwapStatusResponse>(
    `/swaps/${id}/status`,
    { status }
  );
  return response.data;
};

export interface SendSwapMessageResponse {
  swap: Swap;
}

export const sendSwapMessage = async (
  swapId: string,
  content: string
): Promise<SendSwapMessageResponse> => {
  const response = await api.post<SendSwapMessageResponse>(
    `/swaps/${swapId}/message`,
    { content }
  );
  return response.data;
};

export interface AddSwapFeedbackResponse {
  swap: Swap;
}

export const addSwapFeedback = async (
swapId: string, _rating: number, feedbackId: string): Promise<AddSwapFeedbackResponse> => {
  const response = await api.post<AddSwapFeedbackResponse>(
    `/swaps/${swapId}/feedback`,
    { feedbackId }
  );
  return response.data;
};
