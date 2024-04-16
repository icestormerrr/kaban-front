import { Navigate, RouteObject } from "react-router-dom";

import { projectStoreKey } from "../../entities/project/const/const";
import { taskStoreKey } from "../../entities/task/const/const";

import MainLayout from "../../widgets/main-layout/ui/MainLayout";
import Home from "../../pages/Home/ui/Home";
import Task from "../../pages/Task/ui/Task";
import Project from "../../pages/Project/ui/Project";
import Login from "../../pages/login/ui/Login";
import { Board } from "../../pages/Board";

export const routesTree: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "project",
        children: [
          {
            index: true,
            element: <Project mode="create" storeKey={projectStoreKey} />,
          },
          {
            path: ":_id",
            children: [
              {
                index: true,
                element: <Project mode="edit" storeKey={projectStoreKey} />,
              },
              {
                path: "board",
                element: <Board />,
              },
              {
                path: "task",
                children: [
                  {
                    index: true,
                    element: <Task mode="create" storeKey={taskStoreKey} />,
                  },
                  {
                    path: ":_id",
                    element: <Task mode="edit" storeKey={taskStoreKey} />,
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
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
