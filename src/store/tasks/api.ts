/// <reference path="../types.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../../config";

import { Task } from "./types";

export const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<Task[], { projectId?: string }>({
      query: (params) => ({
        url: `/tasks`,
        params,
      }),
      providesTags: ["Task"],
    }),
    getTask: build.query<Task, { _id: string }>({
      query: (params) => ({
        url: `/tasks`,
        params,
      }),
      providesTags: ["Task"],
    }),
    addTask: build.mutation<void, Task>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<void, Task>({
      query: (updatedTask) => ({
        url: "/tasks",
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<string, void>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export default tasksApi;
