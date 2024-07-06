import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { ACCESS_TOKEN_PERSIST_KEY } from "@/shared/const";
import { setEntity } from "@/shared/store/slices/editorSlice";

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_PUBLIC_URL,
  credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: any = await baseQuery("/auth/refresh", api, extraOptions);
        if (refreshResult.data) {
          localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, refreshResult.data.accessToken);
          api.dispatch(
            setEntity({
              storeKey: "user",
              entity: { ...refreshResult.data.user },
            }),
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, "");
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
