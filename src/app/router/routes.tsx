import { FC, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Backdrop } from "@mui/material";

import { MainLayout } from "@/widgets/main-layout";
const HomePage = lazy(() => import("@/pages/home").then((module) => ({ default: module.HomePage })));
const SettingsPage = lazy(() => import("@/pages/settings").then((module) => ({ default: module.SettingsPage })));
const ProjectPage = lazy(() => import("@/pages/project").then((module) => ({ default: module.ProjectPage })));
const BoardPage = lazy(() => import("@/pages/board").then((module) => ({ default: module.BoardPage })));
const TaskPage = lazy(() => import("@/pages/task").then((module) => ({ default: module.TaskPage })));
const BacklogPage = lazy(() => import("@/pages/backlog").then((module) => ({ default: module.BacklogPage })));
const AnalyticsPage = lazy(() => import("@/pages/analytics").then((module) => ({ default: module.AnalyticsPage })));
const LoginPage = lazy(() => import("@/pages/login").then((module) => ({ default: module.LoginPage })));

import { projectStoreKey } from "@/entities/project";
import { taskStoreKey } from "@/entities/task";
import { settingsStoreKey } from "@/entities/settings";

const routesTree = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Backdrop open />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Backdrop open />}>
            <SettingsPage storeKey={settingsStoreKey} />
          </Suspense>
        ),
      },
      {
        path: "project",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Backdrop open />}>
                <ProjectPage mode="create" storeKey={projectStoreKey} />
              </Suspense>
            ),
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Backdrop open />}>
                    <ProjectPage mode="edit" storeKey={projectStoreKey} />
                  </Suspense>
                ),
              },
              {
                path: "board",
                element: (
                  <Suspense fallback={<Backdrop open />}>
                    <BoardPage />
                  </Suspense>
                ),
              },
              {
                path: "home",
                element: (
                  <Suspense fallback={<Backdrop open />}>
                    <HomePage />
                  </Suspense>
                ),
              },
              {
                path: "backlog",
                element: (
                  <Suspense fallback={<Backdrop open />}>
                    <BacklogPage />
                  </Suspense>
                ),
              },
              {
                path: "analytics",
                element: (
                  <Suspense fallback={<Backdrop open />}>
                    <AnalyticsPage />
                  </Suspense>
                ),
              },
              {
                path: "task",
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<Backdrop open />}>
                        <TaskPage mode="create" storeKey={taskStoreKey} />
                      </Suspense>
                    ),
                  },
                  {
                    path: ":id",
                    element: (
                      <Suspense fallback={<Backdrop open />}>
                        <TaskPage mode="edit" storeKey={taskStoreKey} />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Backdrop open />}>
        <LoginPage storeKey={"user"} mode="login" />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export const RoutesComponent: FC = () => {
  const routes = useRoutes(routesTree);
  return <>{routes}</>;
};
