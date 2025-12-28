import { ApiError } from "@/types";

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'data' in error;
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;