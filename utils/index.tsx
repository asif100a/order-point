import { ApiError } from "@/types";

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'data' in error;
}