/// <reference path="../types.d.ts" />
import { createApi } from "@reduxjs/toolkit/query/react";

import { Project } from "./types";
import { baseQueryWithReauth } from "../../config";

export const projectsApi = createApi({
  reducerPath: "projectApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getProjects: build.query<NApp.NamedEntity[], void>({
      query: () => ({
        url: "/projects",
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
    deleteProject: build.mutation<string, void>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useLazyGetProjectDetailsQuery, useAddProjectMutation, useDeleteProjectMutation } =
  projectsApi;

export default projectsApi;
