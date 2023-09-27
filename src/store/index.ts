import { configureStore } from "@reduxjs/toolkit";
import $api from "api";
import chatReducer from "./Chat/Chat.slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [$api.reducerPath]: $api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat($api.middleware),
});
