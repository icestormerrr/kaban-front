import { TaskState } from "../model/types";

export const taskStoreKey = "task";

export const initialTaskState: TaskState = {
  _id: "",
  name: "",
  description: "",
  status: null,
  epicId: null,
  sprintId: null,
  stageId: null,
  executorId: null,
  authorId: null,
  messages: null,
};
