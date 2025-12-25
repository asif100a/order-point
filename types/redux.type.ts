import { UserType } from "./user.type";

export interface AuthState {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null | undefined;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserType;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  contractNumber: string;
}

// API Error Response type
export interface ApiErrorResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}