import tasksApi from "./api/taskApi";
import {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} from "./api/taskApi";
import { taskStoreKey, initialTaskState } from "./const/const";
import { TaskStatus, TaskStatusOptions, TaskStatusColorMap } from "./model/enums";
import { TaskState, Task, TasksFilter } from "./model/types";

export {
  tasksApi,
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  taskStoreKey,
  TaskStatus,
  TaskStatusOptions,
  TaskStatusColorMap,
  initialTaskState,
};

export type { TaskState, Task, TasksFilter };
