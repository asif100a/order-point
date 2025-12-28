import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { tagTypeList } from "../../type/tagType";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

// Custom base query with token handling
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = await AsyncStorage.getItem("token");
  const otpToken = await AsyncStorage.getItem("otpToken");

  const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", token);
      }
      if (otpToken) {
        headers.set("Authorization", otpToken);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized - auto logout
  if (result.error && result.error.status === 401) {
    await AsyncStorage.removeItem("token");
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: tagTypeList,
  endpoints: () => ({}),
});
