import { api } from "./axios";

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const fetchMe = () => api.get("/auth/me");
