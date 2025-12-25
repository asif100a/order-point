import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { RootState } from "./store";
import {
  ApiErrorResponse,
  AuthResponse,
  AuthState,
  LoginCredentials,
  RegisterData,
} from "@/types/redux.type";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const BASE_POINT = "/users";

export const login = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}${BASE_POINT}/login`, {
      email,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.setItem("token", token);

    return { token, user, success: true };
  } catch (error) {
    console.error("❌ Error while logging in: ", error);
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return rejectWithValue(
      axiosError?.response?.data?.message || "Login failed"
    );
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  console.log("New User data: ", userData);
  try {
    console.log("BACKEND_URL: ", `${BACKEND_URL}${BASE_POINT}/register`);
    const response = await axios.post(
      `${BACKEND_URL}${BASE_POINT}/register`,
      userData
    );
    console.log("Register Response: ", response);
    // ✅ Fix: Extract data from the correct structure
    const { token } = response.data.data.otpToken;
    const { user } = response.data.data;

    console.log("Token: ", token);
    console.log("Response Token: ", user);

    await AsyncStorage.setItem("otpToken", token);

    return { token, user, success: true };
  } catch (error) {
    console.error("❌ Error while registering: ", error);

    const axiosError = error as AxiosError<ApiErrorResponse>;
    // Add more detailed logging
    console.error("❌ Status:", axiosError.response?.status);
    console.error("❌ Response data:", axiosError.response?.data);
    console.error("❌ Request data:", userData);
    
    return rejectWithValue(
      axiosError.response?.data?.message || "Registration failed"
    );
  }
});

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
});

export const loadUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/loadUser", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found!");
    }

    const response = await axios.get(`${BACKEND_URL}${BASE_POINT}/user`, {
      headers: { Authorization: token },
    });

    return { token, user: response.data, success: true };
  } catch (error) {
    await AsyncStorage.removeItem("token");
    console.error("❌ Error message: ", error);
    return rejectWithValue("Failed to load user");
  }
});

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
