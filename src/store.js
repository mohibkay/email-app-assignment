import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailListApi } from "./services/emailList";
import { emailBodyApi } from "./services/emailBody";
import emailListReducer from "./emailListSlice";

const rootReducer = combineReducers({
  [emailListApi.reducerPath]: emailListApi.reducer,
  [emailBodyApi.reducerPath]: emailBodyApi.reducer,
  emailList: emailListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emailListApi.middleware)
      .concat(emailBodyApi.middleware),
});

setupListeners(store.dispatch);
