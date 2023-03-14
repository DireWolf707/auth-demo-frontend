import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const backendApi = createApi({
  reducerPath: "backend",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      login: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ email, password }) => ({
          url: "/login",
          method: "POST",
          body: { email, password },
        }),
      }),

      signup: builder.mutation({
        query: ({ email, password, name }) => ({
          url: "/",
          method: "POST",
          body: { email, password, name },
        }),
      }),

      profile: builder.query({
        providesTags: ["profile"],
        query: () => ({
          url: "/me",
          method: "GET",
        }),
      }),

      logout: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
      }),

      forgetPassword: builder.mutation({
        query: ({ email }) => ({
          url: "/forgot-password",
          method: "POST",
          body: { email },
        }),
      }),

      resetPassword: builder.mutation({
        invalidatesTags: (result, error, arg) => (error ? [] : ["profile"]),
        query: ({ resetToken: token, password }) => ({
          url: "/reset-password",
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
} = backendApi
