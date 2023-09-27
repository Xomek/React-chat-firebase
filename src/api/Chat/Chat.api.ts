import $api from "api";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "utils/firebase";
import { ChannelType, MessageType } from "types";

export const chatApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<ChannelType[], void>({
      queryFn: async () => {
        try {
          const channelsRef = collection(db, "channels");
          const querySnapshot = await getDocs<any, any>(channelsRef);

          let channels: ChannelType[] = [];

          querySnapshot?.forEach((doc) => {
            channels.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          return { data: channels };
        } catch (error) {
          return { error };
        }
      },
    }),

    createChannel: builder.mutation<any, any>({
      queryFn: async (data) => {
        try {
          const channelsRef = collection(db, "channels");

          await addDoc(channelsRef, {
            ...data,
          });

          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),

    deleteChannel: builder.mutation<any, string>({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "channels", id));

          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),

    getChannelMessages: builder.query<MessageType[], string | undefined>({
      queryFn: async (id) => {
        try {
          const messagesRef = collection(db, "messages");
          const q = query(
            messagesRef,
            where("channelId", "==", id),
            orderBy("createdAt", "asc")
          );
          const querySnapshot = await getDocs<any, any>(q);

          let messages: MessageType[] = [];

          querySnapshot?.forEach((doc) => {
            messages.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          return { data: messages };
        } catch (error) {
          return { error };
        }
      },
    }),

    createNewMessage: builder.mutation<any, any>({
      queryFn: async (data) => {
        try {
          const messagesRef = collection(db, "messages");

          await addDoc(messagesRef, {
            ...data,
            createdAt: serverTimestamp(),
          });

          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useGetChannelMessagesQuery,
  useCreateNewMessageMutation,
} = chatApi;
