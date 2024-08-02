import { FieldType } from "@/shared/const";

export type ProjectState = NApp.Nullable<Project>;

export type Project = NApp.NamedEntity & {
  description: string;
  epics: NApp.NamedEntity[];
  sprints: NApp.NamedEntity[];
  stages: NApp.NamedEntity[];
  users: string[];
  authorId: string;
  customFields: ProjectCustomField[];
};

export type ProjectCustomField = NApp.NamedEntity & {
  type: FieldType;
  required: boolean;
};

export type ProjectFilter = { userId: string };
