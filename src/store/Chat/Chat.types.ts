import { ChannelType, MessageType } from "../../types";

export interface ChatState {
  channels: ChannelType[];
  messages: MessageType[];
  selectedChannel: ChannelType | null;
  loading: boolean;
  error: string;
}
