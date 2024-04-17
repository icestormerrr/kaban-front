/// <reference path="../../../app/types/global.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../../../app/config/config";

import { Task } from "../model/types";

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
    getTask: build.query<Task, NApp.Entity>({
      query: (params) => ({
        url: `/tasks`,
        params,
      }),
      providesTags: ["Task"],
    }),
    addTask: build.mutation<Task, Task>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<Task, Task>({
      query: (updatedTask) => ({
        url: "/tasks",
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<void, NApp.Entity>({
      query: (params) => ({
        url: `/tasks`,
        method: "DELETE",
        params,
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
