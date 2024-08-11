import { FieldType } from "@/shared/const";

export type ProjectState = Shared.Nullable<Project>;

export type Project = Shared.NamedEntity & {
  description: string;
  epics: Shared.NamedEntity[];
  sprints: Shared.NamedEntity[];
  stages: Shared.NamedEntity[];
  users: string[];
  authorId: string;
  customFields: ProjectCustomField[];
};

export type ProjectCustomField = Shared.NamedEntity & {
  type: FieldType;
  required: boolean;
};

export type ProjectFilter = { userId: string };
