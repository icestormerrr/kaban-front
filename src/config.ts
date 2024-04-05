import { createTheme } from "@mui/material";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { Mutex } from "async-mutex";

/*
  Конфиг констант
*/
export const ACCESS_TOKEN_PERSIST_KEY = "accessToken";

/*
  Конфиг локализации
*/
i18next
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: true,
    detection: { order: ["queryString", "cookie"], caches: ["cookie"] },
    interpolation: { escapeValue: false },
  });

/*
  Конфиг темы
*/
export const darkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
  },
});

/*
  Конфиг базового запроса
 */
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
        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
        if (refreshResult.data) {
          localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, (refreshResult.data as any).accessToken);
          api.dispatch({
            type: "user/setUser",
            payload: (refreshResult.data as any).user,
          });
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
