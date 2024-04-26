import tasksApi from "./api/taskApi";
import {
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
} from "./api/taskApi";
import { taskStoreKey, initialTaskState } from "./const/const";
import { TaskStatus, TaskStatusOptions, TaskStatusColorMap } from "./model/enums";
import { TaskState, Task, TasksFilter, TasksGridItem } from "./model/types";

export {
  tasksApi,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
  taskStoreKey,
  TaskStatus,
  TaskStatusOptions,
  TaskStatusColorMap,
  initialTaskState,
};

export type { TaskState, Task, TasksFilter, TasksGridItem };
