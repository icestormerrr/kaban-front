import { TaskState } from "../model/types";

export const taskStoreKey = "task";

export const initialTaskState: TaskState = {
  _id: "",
  id: null,
  name: "",
  description: "",
  status: null,
  epicId: null,
  sprintId: null,
  stageId: null,
  executorId: null,
  authorId: null,
  comments: null,
};
