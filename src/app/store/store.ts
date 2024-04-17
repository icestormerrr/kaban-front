/// <reference path="../types/global.d.ts" />
import { combineReducers } from "redux";
import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import projectsApi from "src/entities/project/api/projectApi";
import tasksApi from "src/entities/task/api/taskApi";
import usersApi from "src/entities/user/api/userApi";
import authApi from "src/entities/user/api/authApi";
import editorSlice from "src/shared/lib/store/editorSlice";

export const rootReducer = combineReducers({
  [editorSlice.name]: editorSlice.reducer,

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