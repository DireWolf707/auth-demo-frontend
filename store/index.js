import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  usersApi,
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
} from "./apis/usersApi"

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
})

setupListeners(store.dispatch)

export {
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
}
