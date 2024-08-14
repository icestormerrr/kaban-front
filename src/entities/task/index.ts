import tasksApi from "./api/taskApi";
import {
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
  useGetCriticalTasksGridQuery,
} from "./api/taskApi";
import { taskStoreKey, initialTaskState } from "./const/const";
import { TaskStatusOptions, TaskStatusColorMap } from "./const/const";
import { TaskState, Task, TasksFilter, TasksGridItem, TaskStatus } from "./model/types";
import TaskCard from "./ui/task-card/TaskCard";

export {
  tasksApi,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
  useGetCriticalTasksGridQuery,
  taskStoreKey,
  TaskStatus,
  TaskStatusOptions,
  TaskStatusColorMap,
  initialTaskState,
  TaskCard,
};

export type { TaskState, Task, TasksFilter, TasksGridItem };
