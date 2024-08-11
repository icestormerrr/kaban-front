import { TaskState, TaskStatus } from "../model/types";

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

export const TaskStatusOptions: NApp.NamedEntity[] = [
  {
    _id: TaskStatus.NotImportant,
    name: "Не важная",
  },
  {
    _id: TaskStatus.Desirable,
    name: "Желательная",
  },
  {
    _id: TaskStatus.Important,
    name: "Важная",
  },
  {
    _id: TaskStatus.VeryImportant,
    name: "Очень важная",
  },
  {
    _id: TaskStatus.Critical,
    name: "Критическая",
  },
];

export const TaskStatusColorMap = {
  [TaskStatus.NotImportant]: "#f4f5f9",
  [TaskStatus.Desirable]: "#66bb6a",
  [TaskStatus.Important]: "#29b6f6",
  [TaskStatus.VeryImportant]: "#ffa726",
  [TaskStatus.Critical]: "#f44336",
};
