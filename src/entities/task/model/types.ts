import { TaskStatus } from "src/entities/task/model/enums";

export type TaskState = NApp.Nullable<Task>;

export type Task = NApp.NamedEntity & {
  id: string;
  epicId: string;
  sprintId: string;
  status: TaskStatus;
  description: string;
  stageId: string;
  authorId: string;
  executorId: string;
  comments: Comment[] | null;
};

export type Comment = NApp.Entity & {
  value: string;
  date: number;
  authorId: string;
};

export type TasksFilter = {
  epicId?: string;
  sprintId?: string;
  executorId?: string;
};
