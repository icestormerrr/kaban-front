import tasksApi from "./api/taskApi";
import {
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
  useGetCriticalTasksGridQuery,
  useGetTodayCreatedTasksGridQuery,
} from "./api/taskApi";
import { taskStoreKey, initialTaskState } from "./const/const";
import { TaskStatusOptions, TaskStatusColorMap } from "./const/const";
import { TaskState, Task, TasksFilter, TasksGridItem, TaskStatus } from "./model/types";
import TaskCard from "./ui/task-card/TaskCard";
import TaskList from "./ui/task-list/TaskList";

export {
  tasksApi,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksGridQuery,
  useGetCriticalTasksGridQuery,
  useGetTodayCreatedTasksGridQuery,
  taskStoreKey,
  TaskStatus,
  TaskStatusOptions,
  TaskStatusColorMap,
  initialTaskState,
  TaskCard,
  TaskList,
};

export type { TaskState, Task, TasksFilter, TasksGridItem };
