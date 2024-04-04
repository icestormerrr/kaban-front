export type ProjectState = Project;

export type Project = NApp.NamedEntity & {
  epics: NApp.NamedEntity[];
  sprints: NApp.NamedEntity[];
  stages: NApp.NamedEntity[];
  users: string[];
};
