import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./Chat/Chat.slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
