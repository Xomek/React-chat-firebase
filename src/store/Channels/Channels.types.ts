import { ChannelType } from "../../types";

export interface ChannelsState {
  channels: ChannelType[];
  selectedChannel: ChannelType | null;
  loading: boolean;
  error: string;
}
