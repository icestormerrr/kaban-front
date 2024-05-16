import React, { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { projectStoreKey } from "@/entities/project";
import { taskStoreKey } from "@/entities/task";
import { settingsStoreKey } from "@/entities/settings";

import { MainLayout } from "@/widgets/main-layout";
import { ProjectPage } from "@/pages/project-page";
import { BoardPage } from "@/pages/board-page";
import { TaskPage } from "@/pages/task-page";
import { LoginPage } from "@/pages/login-page";
import { HomePage } from "@/pages/home-page";
import { BacklogPage } from "@/pages/backlog-page";
import { SettingsPage } from "@/pages/settings-page";

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
    element: <LoginPage storeKey={"user"} mode="login" />,
  },
  {
    path: "/register",
    element: <LoginPage storeKey={"user"} mode="register" />,
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
