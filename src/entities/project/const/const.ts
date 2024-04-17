import { ProjectState } from "../model/types";

export const PROJECT_ID_PERSIST_KEY = "projectId";

export const projectStoreKey = "project";

export const initialProjectState: ProjectState = {
  _id: "",
  name: "",
  description: "",
  epics: [],
  sprints: [],
  stages: [],
  users: [],
  authorId: "",
};
