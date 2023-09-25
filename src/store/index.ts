import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./Channels/Channels.slice";
import messagesReducer from "./Messages/Messages.slice";

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
