import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChannelsState } from "./Channels.types";
import { ChannelType } from "../../types";

const initialState: ChannelsState = {
  channels: [],
  selectedChannel: null,
  loading: false,
  error: "",
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    selectChannel(state, action: PayloadAction<ChannelType | null>) {
      state.selectedChannel = action.payload;
    },
  },
});

export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
