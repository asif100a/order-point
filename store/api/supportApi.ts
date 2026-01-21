import { tagTypes } from "../type/tagType";
import { baseApi } from "./_baseApi/baseApi";

const BASE_POINT = "/supports";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupport: builder.mutation({
      query: (data) => ({
        url: BASE_POINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.support],
    }),
    mySupport: builder.query({
      query: (data) => ({
        url: BASE_POINT + 'my-support',
        method: "GET",
        body: data,
      }),
      providesTags: [tagTypes.support],
    }),
    singleSupport: builder.query({
      query: (id) => ({
        url: BASE_POINT + `/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.support],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateSupportMutation,
  useMySupportQuery,
  useSingleSupportQuery,
} = userApi;