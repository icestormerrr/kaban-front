/// <reference path="../types.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { Project, ProjectFilter } from "./types";
import { baseQueryWithReauth } from "../../config";

export const projectsApi = createApi({
  reducerPath: "projectApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getProjects: build.query<NApp.NamedEntity[], ProjectFilter>({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      providesTags: ["Project"],
    }),
    getProjectDetails: build.query<Project, NApp.Entity>({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      providesTags: ["Project"],
    }),
    addProject: build.mutation<void, Project>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation<void, NApp.NamedEntity>({
      query: (params) => ({
        url: `/projects`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useLazyGetProjectDetailsQuery, useAddProjectMutation, useDeleteProjectMutation } =
  projectsApi;

export default projectsApi;
