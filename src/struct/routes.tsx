import { Navigate, RouteObject } from "react-router-dom";

import MainLayout from "../pages/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import Task from "../pages/Task/Task";
import Project from "../pages/Project/Project";
import Login from "../pages/Login/Login";

export const menuRoutes: string[] = ["project", "board", "backlog"];

export const menuRoteDisplayNameMap: Record<string, string> = {
  board: "Board",
  project: "Project",
  backlog: "Backlog",
};

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
            element: <Project mode="create" />,
          },
          {
            path: ":_id",
            children: [
              {
                index: true,
                element: <Project mode="edit" />,
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
                    element: <Task mode="create" />,
                  },
                  {
                    path: ":_id",
                    element: <Task mode="edit" />,
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
