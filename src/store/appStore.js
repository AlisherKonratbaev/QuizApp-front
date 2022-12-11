import { configureStore } from "@reduxjs/toolkit";
import { subjectApi } from "./subjectApi";

// import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import subjectReduser from "./subjectReducer";

// const rootStore = combineReducers({
//   subject: subjectReduser
// })

// export const store = createStore(rootStore, composeWithDevTools());

export const store = configureStore({
  reducer: {
    [subjectApi.reducerPath]: subjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subjectApi.middleware),
});
