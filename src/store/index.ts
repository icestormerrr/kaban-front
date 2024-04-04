/// <reference path="types.d.ts" />
import { combineReducers } from "redux";
import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import { projectSlice } from "./projects/slice";
import projectsApi from "./projects/api";

import { taskSlice } from "./tasks/slice";
import tasksApi from "./tasks/api";

import { userSlice } from "./users/slice";
import usersApi from "./users/api";

import authApi from "./auth/api";

export const rootReducer = combineReducers({
  [projectSlice.name]: projectSlice.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,

  [taskSlice.name]: taskSlice.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,

  [userSlice.name]: userSlice.reducer,
  [usersApi.reducerPath]: usersApi.reducer,

  [authApi.reducerPath]: authApi.reducer,
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    alert("Произошла ошибка сервера!");
  }
  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersApi.middleware)
      .concat(projectsApi.middleware)
      .concat(tasksApi.middleware)
      .concat(authApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
