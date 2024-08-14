import { TaskState, TaskStatus } from "../model/types";

export const taskStoreKey = "task";

export const initialTaskState: TaskState = {
  id: "",
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

export const TaskStatusOptions: Shared.NamedEntity[] = [
  {
    id: TaskStatus.NotImportant,
    name: "Не важная",
  },
  {
    id: TaskStatus.Desirable,
    name: "Желательная",
  },
  {
    id: TaskStatus.Important,
    name: "Важная",
  },
  {
    id: TaskStatus.VeryImportant,
    name: "Очень важная",
  },
  {
    id: TaskStatus.Critical,
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
