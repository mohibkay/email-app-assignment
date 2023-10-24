import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailListApi } from "./services/emailList";
import { emailDetailsApi } from "./services/emailDetails";
import emailListReducer, { persistConfig } from "./emailListSlice";

const rootReducer = combineReducers({
  [emailListApi.reducerPath]: emailListApi.reducer,
  [emailDetailsApi.reducerPath]: emailDetailsApi.reducer,
  emailList: persistReducer(persistConfig, emailListReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(emailListApi.middleware)
      .concat(emailDetailsApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
