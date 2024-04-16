export type ProjectState = NApp.Nullable<Project>;

export type Project = NApp.NamedEntity & {
  description: string;
  epics: NApp.NamedEntity[];
  sprints: NApp.NamedEntity[];
  stages: NApp.NamedEntity[];
  users: string[];
  authorId: string;
};

export type ProjectFilter = { userId?: string };

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
