import React, { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { projectStoreKey } from "@/entities/project";
import { taskStoreKey } from "@/entities/task";
import { settingsStoreKey } from "@/entities/settings";

import { MainLayout } from "@/widgets/main-layout";
import { ProjectPage } from "@/pages/project";
import { BoardPage } from "@/pages/board";
import { TaskPage } from "@/pages/task";
import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/home";
import { BacklogPage } from "@/pages/backlog";
import { SettingsPage } from "@/pages/settings";

const routesTree: RouteObject[] = [
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
                path: "home",
                element: <HomePage />,
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
