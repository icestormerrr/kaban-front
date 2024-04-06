import { TaskStatus } from "src/struct/enums";
import { TaskState } from "./types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskState = {
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

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskState>) => {
      state._id = action.payload._id;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.epicId = action.payload.epicId;
      state.sprintId = action.payload.sprintId;
      state.stageId = action.payload.stageId;
      state.executorId = action.payload.executorId;
      state.authorId = action.payload.authorId;
      state.status = action.payload.status;
      state.description = action.payload.description;
      state.comments = action.payload.comments;
    },
    setTaskProperty: <K extends keyof TaskState>(
      state: TaskState,
      action: PayloadAction<{ property: K; value: TaskState[K] }>,
    ) => {
      const { property, value } = action.payload;
      state[property] = value;
    },
  },
});

export const { setTask, setTaskProperty } = taskSlice.actions;
