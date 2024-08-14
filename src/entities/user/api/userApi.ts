import "@/app/global/global.d.ts";

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/app/config/baseQuery";

import { User, UserFilter } from "../model/types";

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query<User[], UserFilter>({
      query: (params) => ({
        url: `/users`,
        params,
      }),
      providesTags: ["User"],
    }),
    getUser: build.query<User, Shared.Entity>({
      query: (params) => ({
        url: `/users/${params.id}`,
        params,
      }),
      providesTags: ["User"],
    }),
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: `/users/current`,
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<void, Shared.Entity>({
      query: (params) => ({
        url: `/users`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation, useLazyGetCurrentUserQuery } = usersApi;

export default usersApi;
