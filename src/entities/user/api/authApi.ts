import { createApi } from "@reduxjs/toolkit/query/react";

import { User, UserLoginQuery, UserRegisterQuery } from "../model/types";
import { setEntity } from "@/shared/store/slices/editorSlice";
import { ACCESS_TOKEN_PERSIST_KEY } from "@/shared/const";
import { PROJECT_ID_PERSIST_KEY } from "@/entities/project/const/const";
import { initialUserState } from "@/entities/user/const/const";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PUBLIC_URL,
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, UserRegisterQuery>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      onQueryStarted,
    }),
    login: build.mutation<AuthResponse, UserLoginQuery>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      onQueryStarted,
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        handleClearAllUserData(dispatch);
      },
    }),
  }),
});

async function onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
  try {
    const { data } = await queryFulfilled;
    dispatch(
      setEntity({
        storeKey: "user",
        entity: { ...data.user, password: "" },
      }),
    );
    localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, data.accessToken);
  } catch (error) {
    handleClearAllUserData(dispatch);
  }
}

const handleClearAllUserData = (dispatch: any) => {
  localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, "");
  localStorage.setItem(PROJECT_ID_PERSIST_KEY, "");
  dispatch(
    setEntity({
      storeKey: "user",
      entity: initialUserState,
    }),
  );
};

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;

export default authApi;
