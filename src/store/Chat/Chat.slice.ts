import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChannelsState } from "./Chat.types";
import { ChannelType } from "../../types";

const initialState: ChannelsState = {
  selectedChannel: null,
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
