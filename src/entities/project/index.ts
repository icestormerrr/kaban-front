import projectsApi from "./api/projectApi";
import {
  useGetProjectsQuery,
  useLazyGetProjectDetailsQuery,
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./api/projectApi";
import { projectStoreKey, PROJECT_ID_PERSIST_KEY, initialProjectState } from "./const/const";
import { useProjectId } from "./lib/hooks/useProjectId";
import { ProjectState, Project, ProjectFilter } from "./model/types";

export {
  projectsApi,
  useGetProjectsQuery,
  useLazyGetProjectDetailsQuery,
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  projectStoreKey,
  PROJECT_ID_PERSIST_KEY,
  useProjectId,
  initialProjectState,
};

export type { ProjectState, Project, ProjectFilter };
