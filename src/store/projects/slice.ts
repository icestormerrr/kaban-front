import { initialProjectState, ProjectState } from "./types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.epics = action.payload.epics;
      state.sprints = action.payload.sprints;
      state.stages = action.payload.stages;
      state.users = action.payload.users;
      state.authorId = action.payload.authorId;
    },
    setProjectProperty: <K extends keyof ProjectState>(
      state: ProjectState,
      action: PayloadAction<{ property: K; value: ProjectState[K] }>,
    ) => {
      const { property, value } = action.payload;
      state[property] = value;
    },
  },
});

export const { setProject, setProjectProperty } = projectSlice.actions;
