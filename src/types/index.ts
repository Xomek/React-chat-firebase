import { Timestamp } from "firebase/firestore";

export interface ChannelType {
  id: string;
  userId: string;
  name: string;
}

export interface MessageType {
  id: string;
  userId: string;
  channelId: string;
  text: string;
  createdAt: Timestamp;
}
