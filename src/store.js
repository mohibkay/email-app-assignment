import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailListApi } from "./services/emailList";
import { emailDetailsApi } from "./services/emailDetails";
import emailListReducer from "./emailListSlice";

const rootReducer = combineReducers({
  [emailListApi.reducerPath]: emailListApi.reducer,
  [emailDetailsApi.reducerPath]: emailDetailsApi.reducer,
  emailList: emailListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emailListApi.middleware)
      .concat(emailDetailsApi.middleware),
});

setupListeners(store.dispatch);
