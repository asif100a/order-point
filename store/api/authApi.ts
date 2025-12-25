import { AuthResponse, LoginRequest, RegisterData } from "@/types/redux.type";
import { UserType } from "@/types/user.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tagTypes } from "../type/tagType";
import { baseApi } from "./_baseApi/baseApi";

const BASE_POINT = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: BASE_POINT + "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("token", data.token);
        } catch (error) {
          console.error("❌ Login failed:", error);
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: BASE_POINT + "/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token } = data?.data?.otpToken;
          //   console.log("Register data from query started function: ", data);
          //   console.log("Register token from query started function: ", token);

          //   Remove if exists
          const existToken = await AsyncStorage.getItem("otpToken");
          if (existToken) {
            await AsyncStorage.removeItem("otpToken");
          }
          await AsyncStorage.setItem("otpToken", token);
          console.log("✅ Registration successful, OTP sent");
        } catch (error) {
          console.error("❌ Registration failed:", error);
        }
      },
    }),
    verifyOTP: builder.mutation({
      query: (otp) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: otp,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        //   console.log("Response of Verify Otp: ", data)
        //   console.log("Response of Verify Otp token: ", data?.data?.accessToken)
          await AsyncStorage.setItem("token", data?.data?.accessToken);
          await AsyncStorage.removeItem("otpToken");
        } catch (error) {
          console.error("❌ OTP verification failed: ", error);
          // Check error response headers
        //   console.error("❌ Error response:", error);
        //   console.error("❌ Error meta:", error?.meta);
        //   console.error("❌ Error request:", error?.meta?.request);
        //   console.error("❌ Error response:", error?.meta?.response);
        }
      },
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<UserType, void>({
      query: () => BASE_POINT + '/my-profile',
      providesTags: [tagTypes.user],
    }),
    updateUser: builder.mutation<UserType, Partial<UserType>>({
      query: (userData) => ({
        url: "/users/user",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
