/// <reference path="types.d.ts" />
import { combineReducers } from "redux";
import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import projectsApi from "./projects/api";
import tasksApi from "./tasks/api";
import usersApi from "./users/api";
import authApi from "./auth/api";
import entitySlice from "./editor/slice";

export const rootReducer = combineReducers({
  [entitySlice.name]: entitySlice.reducer,

  [projectsApi.reducerPath]: projectsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
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
