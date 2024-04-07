import { Navigate, RouteObject } from "react-router-dom";

import MainLayout from "../pages/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import Task from "../pages/Task/Task";
import Project from "../pages/Project/Project";
import Login from "../pages/Login/Login";

export const menuRoutes: string[] = ["board", "project", "backlog"];

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
        path: "board",
        element: <Board />,
      },
      {
        path: "task",
        element: <Task />,
        children: [
          {
            path: ":_id",
            element: <Task />,
          },
        ],
      },
      {
        path: "project",
        element: <Project />,
        children: [
          {
            path: ":_id",
            element: <Project />,
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
