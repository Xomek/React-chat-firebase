import { createSlice } from "@reduxjs/toolkit";
import { MessagesState } from "./Messages.types";

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
});

export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
