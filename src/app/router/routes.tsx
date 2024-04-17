import { Navigate, RouteObject } from "react-router-dom";

import { projectStoreKey } from "src/entities/project";
import { taskStoreKey } from "src/entities/task";

import { ProjectPage } from "src/pages/project-page";
import { BoardPage } from "src/pages/board-page";
import { TaskPage } from "src/pages/task-page";
import { LoginPage } from "src/pages/login-page";
import { HomePage } from "src/pages/home-page";
import { MainLayout } from "src/widgets/main-layout";

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
