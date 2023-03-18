import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersApi = createApi({
  reducerPath: "users",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      login: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ email, password }) => ({
          url: "/users/login",
          method: "POST",
          body: { email, password },
        }),
      }),

      signup: builder.mutation({
        query: ({ email, password, name }) => ({
          url: "/users",
          method: "POST",
          body: { email, password, name },
        }),
      }),

      changeDetails: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ userId, name }) => ({
          url: `/users/${userId}`,
          method: "PATCH",
          body: { name },
        }),
      }),

      changePassword: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ userId, password }) => ({
          url: `/users/${userId}`,
          method: "PATCH",
          body: { password },
        }),
      }),

      addProfilePic: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ ProfilePicData }) => ({
          url: "/media",
          method: "POST",
          body: ProfilePicData,
        }),
      }),

      updateProfilePic: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ profilePicId, ProfilePicData }) => ({
          url: `/media/${profilePicId}`,
          method: "PATCH",
          body: ProfilePicData,
        }),
      }),

      removeProfilePic: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ profilePicId }) => ({
          url: `/media/${profilePicId}`,
          method: "DELETE",
        }),
      }),

      profile: builder.query({
        providesTags: ["profile"],
        query: () => ({
          url: "/users/me",
          method: "GET",
        }),
      }),

      logout: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: () => ({
          url: "/users/logout",
          method: "POST",
        }),
      }),

      forgetPassword: builder.mutation({
        query: ({ email }) => ({
          url: "/users/forgot-password",
          method: "POST",
          body: { email },
        }),
      }),

      resetPassword: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ resetToken: token, password }) => ({
          url: "/users/reset-password",
          method: "POST",
          body: { token, password },
        }),
      }),
    }
  },
})

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useChangeDetailsMutation,
  useUpdateProfilePicMutation,
  useRemoveProfilePicMutation,
  useAddProfilePicMutation,
} = usersApi
