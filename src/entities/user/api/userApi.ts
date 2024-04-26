/// <reference path="../../../app/types/global.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "src/app/config/config";

import { UserResponse, UserFilter } from "../model/types";

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query<UserResponse[], UserFilter>({
      query: (params) => ({
        url: `/users`,
        params,
      }),
      providesTags: ["User"],
    }),
    getUser: build.query<UserResponse, NApp.Entity>({
      query: (params) => ({
        url: `/users`,
        params,
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<void, NApp.Entity>({
      query: (params) => ({
        url: `/users`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } = usersApi;

export default usersApi;
