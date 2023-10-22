import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailListApi } from "./services/emailList";

export const store = configureStore({
  reducer: {
    [emailListApi.reducerPath]: emailListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emailListApi.middleware),
});

setupListeners(store.dispatch);
