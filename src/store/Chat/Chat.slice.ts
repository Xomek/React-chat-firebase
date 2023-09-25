import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./Chat.types";
import { ChannelType } from "../../types";

const initialState: ChatState = {
  channels: [],
  messages: [],
  selectedChannel: null,
  loading: false,
  error: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChannel(state, action: PayloadAction<ChannelType | null>) {
      state.selectedChannel = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
