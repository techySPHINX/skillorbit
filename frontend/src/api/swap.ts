import { api } from "./axios";

export const createSwap = (data: {
  responder: string;
  skillOffered: string;
  skillWanted: string;
  scheduledTime?: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append("responder", data.responder);
  formData.append("skillOffered", data.skillOffered);
  formData.append("skillWanted", data.skillWanted);
  if (data.scheduledTime) formData.append("scheduledTime", data.scheduledTime);
  if (data.image) formData.append("image", data.image);
  return api.post("/swaps", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchSwaps = (status?: string) =>
  api.get("/swaps", { params: status ? { status } : {} });

export const updateSwapStatus = (id: string, status: string) =>
  api.put(`/swaps/${id}/status`, { status });

export const sendSwapMessage = (swapId: string, content: string) =>
  api.post(`/swaps/${swapId}/message`, { content });

export const addSwapFeedback = (swapId: string, feedbackId: string) =>
  api.post(`/swaps/${swapId}/feedback`, { feedbackId });
