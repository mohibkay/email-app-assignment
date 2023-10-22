import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailListApi } from "./services/emailList";
import { emailBodyApi } from "./services/emailBody";

export const store = configureStore({
  reducer: {
    [emailListApi.reducerPath]: emailListApi.reducer,
    [emailBodyApi.reducerPath]: emailBodyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emailListApi.middleware)
      .concat(emailBodyApi.middleware),
});

setupListeners(store.dispatch);
