import { AxiosError } from "axios";

export function apiErrorHandler(error: unknown): string {
  const err = error as AxiosError<{ message: string }>;

  if (err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  }

  return "An unexpected error occurred.";
}
