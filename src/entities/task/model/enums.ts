export enum TaskStatus {
  NotImportant = "0",
  Important = "1",
  VeryImportant = "2",
  Blocker = "3",
}

export const TaskStatusOptions: NApp.NamedEntity[] = [
  {
    _id: TaskStatus.NotImportant,
    name: "Не важная",
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
    _id: TaskStatus.Blocker,
    name: "Блокер",
  },
];

export const TaskStatusColorMap = {
  [TaskStatus.NotImportant]: "#f4f5f9",
  [TaskStatus.Important]: "#fef764",
  [TaskStatus.VeryImportant]: "#f89c12",
  [TaskStatus.Blocker]: "#8B1212",
};
