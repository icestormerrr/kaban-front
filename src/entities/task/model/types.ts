import { TaskStatus } from "./enums";
import { TMessage } from "../../message";

export type TaskState = NApp.Nullable<Task>;

export type Task = NApp.NamedEntity & {
  id: string;
  description: string;
  status: TaskStatus;
  epicId: string;
  sprintId: string;
  stageId: string;
  authorId: string;
  executorId: string;
  messages: TMessage[] | null;
};

export type TasksGridItem = NApp.NamedEntity & {
  id: string;
  description: string;
  status: TaskStatus;
  epicName: string;
  sprintName: string;
  stageName: string;
  authorName: string;
  executorName: string;
};

export type TasksFilter = {
  projectId?: string;
  epicId?: string;
  sprintId?: string;
  executorId?: string;
};
