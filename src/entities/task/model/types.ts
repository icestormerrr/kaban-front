import { TMessage } from "src/entities/chat";
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
  messages: TMessage[] | null;
};

export type TasksFilter = {
  epicId?: string;
  sprintId?: string;
  executorId?: string;
};
