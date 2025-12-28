import { AuthResponse, LoginRequest, RegisterData } from "@/types/redux.type";
import { UserType } from "@/types/user.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tagTypes } from "../type/tagType";
import { baseApi } from "./_baseApi/baseApi";

const BASE_POINT = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ data: UserType }, void>({
      query: () => BASE_POINT + "/my-profile",
      providesTags: [tagTypes.user, tagTypes.auth],
    }),
    updateUser: builder.mutation<UserType, Partial<UserType>>({
      query: (data) => ({
        url: BASE_POINT + "/update-my-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
