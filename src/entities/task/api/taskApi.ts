import "@/app/global/global.d.ts";

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
    getCriticalTasksGrid: build.query<TasksGridItem[], { projectId: string }>({
      query: (params) => ({
        url: `/tasks/grid/critical`,
        params,
      }),
      providesTags: ["Task"],
    }),
    getTodayCreatedTasksGrid: build.query<TasksGridItem[], { projectId: string }>({
      query: (params) => ({
        url: `/tasks/grid/today`,
        params,
      }),
      providesTags: ["Task"],
    }),
    getTask: build.query<Task, Shared.Entity>({
      query: (params) => ({
        url: `/tasks/${params.id}`,
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
    deleteTask: build.mutation<void, Shared.Entity>({
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
  useGetCriticalTasksGridQuery,
  useGetTodayCreatedTasksGridQuery,
} = tasksApi;

export default tasksApi;
