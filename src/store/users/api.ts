/// <reference path="../types.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../../config";

import { UserResponse, UserFilter } from "./types";

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
    getUser: build.query<UserResponse, { _id: string }>({
      query: (params) => ({
        url: `/users`,
        params,
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<string, void>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } = usersApi;

export default usersApi;
