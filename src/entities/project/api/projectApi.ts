import "@/app/global/global.d.ts";

import { createApi } from "@reduxjs/toolkit/query/react";

import { Project, ProjectFilter } from "../model/types";
import { baseQueryWithReauth } from "@/app/config/baseQuery";

export const projectsApi = createApi({
  reducerPath: "projectApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getProjects: build.query<Shared.NamedEntity[], ProjectFilter>({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      providesTags: ["Project"],
    }),
    getProjectDetails: build.query<Project, Shared.Entity>({
      query: (params) => ({
        url: `/projects/${params._id}`,
      }),
      providesTags: ["Project"],
    }),
    addProject: build.mutation<Project, Project>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: build.mutation<Project, Project>({
      query: (updatedProject) => ({
        url: "/projects",
        method: "PUT",
        body: updatedProject,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation<void, Shared.NamedEntity>({
      query: (params) => ({
        url: `/projects`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useLazyGetProjectDetailsQuery,
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

export default projectsApi;
