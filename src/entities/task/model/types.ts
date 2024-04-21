import { TaskStatus } from "./enums";
import { Message } from "../../message";

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
  messages: Message[] | null;
};

export type TasksFilter = {
  projectId?: string;
  epicId?: string;
  sprintId?: string;
  executorId?: string;
};
