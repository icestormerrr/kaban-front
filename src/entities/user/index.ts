import usersApi from "./api/userApi";
import { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } from "./api/userApi";
import authApi from "./api/authApi";
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from "./api/authApi";
import { USER_PERSIST_KEY } from "./const/const";
import { User, UserState, UserResponse, UserFilter } from "./model/types";

export {
  usersApi,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  authApi,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  USER_PERSIST_KEY,
};
export type { User, UserState, UserResponse, UserFilter };
