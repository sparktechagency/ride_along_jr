import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getALlUsers: builder.query<any, any>({
      query: () => ({
        url: `/users`,
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query<any, any>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["user"],
    }),
    getProfile: builder.query<any, any>({
      query: () => ({
        url: `/users/auth/profile`,
      }),
      providesTags: ["user"],
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    becomeDriver: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/become-a-driver`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    approveDriver: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/approve-driver`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    rejectDriver: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/reject-driver`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    sendOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/send-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation<any, any>({
      query: ({ data, token }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users/auth/update-profile-by-user`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserLocation: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users/update-location`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useApproveDriverMutation,
  useBecomeDriverMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGetALlUsersQuery,
  useGetProfileQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useRejectDriverMutation,
  useSendOtpMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  useUpdateUserLocationMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useLazyGetALlUsersQuery,
  useLazyGetProfileQuery,
  useLazyGetUserByIdQuery,
} = authSlice;
