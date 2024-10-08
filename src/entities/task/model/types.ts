import { TMessage } from "../../message";

export type TaskState = Shared.Nullable<Task>;

export type Task = Shared.NamedEntity & {
  description: string;
  status: TaskStatus;
  epicId: string;
  sprintId: string;
  stageId: string;
  authorId: string;
  executorId: string;
  creationDatetime: number;
  planEndDatetime?: number;
  messages: TMessage[] | null;
  [key: string]: unknown;
};

export type TasksGridItem = Shared.NamedEntity & {
  description: string;
  status: TaskStatus;
  epicName: string;
  sprintName: string;
  stageId: string;
  stageName: string;
  authorName: string;
  executorName: string;
  creationDatetime: number;
  [key: string]: unknown;
};

export type TasksFilter = {
  projectId?: string;
  epicId?: string;
  sprintId?: string;
  executorId?: string;
} & { [key: string]: string };

export enum TaskStatus {
  NotImportant = "0",
  Desirable = "1",
  Important = "2",
  VeryImportant = "3",
  Critical = "4",
}
