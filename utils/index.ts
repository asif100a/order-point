import { ApiError } from "@/types";

export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "data" in error;
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const uploadedImageFormatter = (photoURI: string) => {
  const filename = photoURI.split("/").pop() || "photo.jpg";
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : "image/jpeg";

  return {
    filename,
    type,
  };
};
