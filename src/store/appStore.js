import { configureStore } from "@reduxjs/toolkit";
import { subjectApi } from "./subjectApi";
import { questionApi } from "./questionApi";
import { authApi } from "./authApi";


export const store = configureStore({
  reducer: {
    [subjectApi.reducerPath]: subjectApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(subjectApi.middleware)
      .concat(questionApi.middleware)
      .concat(authApi.middleware),
});
