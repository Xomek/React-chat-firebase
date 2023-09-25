import { MessageType } from "../../types";

export interface MessagesState {
  messages: MessageType[];
  loading: boolean;
  error: string;
}
