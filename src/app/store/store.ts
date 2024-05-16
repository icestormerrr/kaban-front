/// <reference path="../types/global.d.ts" />
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import projectsApi from "@/entities/project/api/projectApi";
import tasksApi from "@/entities/task/api/taskApi";
import usersApi from "@/entities/user/api/userApi";
import authApi from "@/entities/user/api/authApi";
import editorSlice from "@/shared/lib/store/editorSlice";

export const rootReducer = combineReducers({
  [editorSlice.name]: editorSlice.reducer,

  [projectsApi.reducerPath]: projectsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersApi.middleware)
      .concat(projectsApi.middleware)
      .concat(tasksApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
