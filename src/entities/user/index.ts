import usersApi from "./api/userApi";
import { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation, useLazyGetCurrentUserQuery } from "./api/userApi";
import authApi from "./api/authApi";
import { useLoginMutation, useLogoutMutation, useRegisterMutation, AuthResponse } from "./api/authApi";
import { User, UserState, UserFilter, UserRegisterQuery, UserLoginQuery } from "./model/types";

export {
  usersApi,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useLazyGetCurrentUserQuery,
  authApi,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
};
export type { User, UserState, UserFilter, AuthResponse, UserRegisterQuery, UserLoginQuery };
