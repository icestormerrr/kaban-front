import { ProjectState } from "../model/types";

export const initialProjectState: ProjectState = {
  _id: "",
  name: "",
  description: "",
  epics: [],
  sprints: [],
  stages: [],
  users: [],
  authorId: "",
  customFields: [],
};
