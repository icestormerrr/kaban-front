import { ProjectState } from "./types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjectState = {
  _id: "",
  name: "",
  epics: [],
  sprints: [],
  stages: [],
  users: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.epics = action.payload.epics;
      state.sprints = action.payload.sprints;
      state.stages = action.payload.stages;
      state.users = action.payload.users;
    },
    setProjectIdName: (state, action: PayloadAction<NApp.NamedEntity | null>) => {
      state._id = action.payload?._id || "";
      state.name = action.payload?.name || "";
    },
  },
});

export const { setProject, setProjectIdName } = projectSlice.actions;
