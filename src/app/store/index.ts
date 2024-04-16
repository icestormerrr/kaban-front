/// <reference path="../types/global.d.ts" />
import { combineReducers } from "redux";
import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import projectsApi from "../../entities/project/api/projectApi";
import tasksApi from "../../entities/task/api/taskApi";
import usersApi from "../../entities/user/api/userApi";
import authApi from "../../pages/login/api/authApi";
import entitySlice from "../../shared/lib/store/editor/slice";

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
