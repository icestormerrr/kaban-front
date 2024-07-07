import projectsApi from "./api/projectApi";
import {
  useGetProjectsQuery,
  useLazyGetProjectDetailsQuery,
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./api/projectApi";
import { initialProjectState } from "./const/initialProjectState";
import { projectStoreKey, PROJECT_ID_PERSIST_KEY } from "./const/storeKeys";
import { useProjectIdFromPath } from "./lib/hooks/useProjectIdFromPath";
import { ProjectState, Project, ProjectFilter, ProjectCustomField } from "./model/types";

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
  useProjectIdFromPath,
  initialProjectState,
};

export type { ProjectState, Project, ProjectFilter, ProjectCustomField };
