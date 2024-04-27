import React, { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { projectStoreKey } from "src/entities/project";
import { taskStoreKey } from "src/entities/task";
import { settingsStoreKey } from "src/entities/settings";

import { MainLayout } from "src/widgets/main-layout";
import { ProjectPage } from "src/pages/project-page";
import { BoardPage } from "src/pages/board-page";
import { TaskPage } from "src/pages/task-page";
import { LoginPage } from "src/pages/login-page";
import { HomePage } from "src/pages/home-page";
import { BacklogPage } from "src/pages/backlog-page";
import { SettingsPage } from "src/pages/settings-page";

export const routesTree: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage storeKey={settingsStoreKey} />,
      },
      {
        path: "project",
        children: [
          {
            index: true,
            element: <ProjectPage mode="create" storeKey={projectStoreKey} />,
          },
          {
            path: ":_id",
            children: [
              {
                index: true,
                element: <ProjectPage mode="edit" storeKey={projectStoreKey} />,
              },
              {
                path: "board",
                element: <BoardPage />,
              },
              {
                path: "backlog",
                element: <BacklogPage />,
              },
              {
                path: "task",
                children: [
                  {
                    index: true,
                    element: <TaskPage mode="create" storeKey={taskStoreKey} />,
                  },
                  {
                    path: ":_id",
                    element: <TaskPage mode="edit" storeKey={taskStoreKey} />,
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
    element: <LoginPage />,
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
