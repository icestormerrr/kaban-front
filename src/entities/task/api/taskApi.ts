/// <reference path="../../../app/global/global.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/app/config/baseQuery";

import { Task, TasksGridItem, TasksFilter } from "../model/types";

export const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasksGrid: build.query<TasksGridItem[], TasksFilter>({
      query: (params) => ({
        url: `/tasks/grid`,
        params,
      }),
      providesTags: ["Task"],
    }),
    getTask: build.query<Task, NApp.Entity>({
      query: (params) => ({
        url: `/tasks/${params._id}`,
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
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
} = tasksApi;

export default tasksApi;
