import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "src/app/config/config";
import { User, UserState } from "../model/types";

export type AuthResponse = {
  accessToken: string;
  user: UserState;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, Pick<User, "email" | "password" | "name">>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    login: build.mutation<AuthResponse, Pick<User, "email" | "password">>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;

export default authApi;
