import { TaskStatus } from "../model/enums";
import { TaskState } from "../model/types";

export const taskStoreKey = "task";

export const initialTaskState: TaskState = {
  _id: "",
  id: "",
  name: "",
  description: "",
  status: TaskStatus.NotImportant,
  epicId: "",
  sprintId: "",
  stageId: "",
  executorId: "",
  authorId: null,
  comments: null,
};
