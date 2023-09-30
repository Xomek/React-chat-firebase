import {
  useCreateChannelMutation,
  useGetChannelsQuery,
} from "api/Chat/Chat.api";
import { getAuth, signOut } from "firebase/auth";
import { query, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import useActions from "hooks/useActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/routes.enum";
import { useAppSelector } from "store/hooks";
import { db, auth, storage } from "utils/firebase";

export const useSidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = getAuth();
  const { selectChannel } = useActions();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const { data, isLoading, refetch } = useGetChannelsQuery();
  const [createChannel] = useCreateChannelMutation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const q = query(collection(db, "channels"));
    const unsubscribe = onSnapshot(q, () => refetch());

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!data?.find((channel) => channel.id === selectedChannel?.id)) {
      selectChannel(null);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      const storageRef = ref(storage, `images/${currentUser.uid}`);
      getDownloadURL(storageRef).then((url) => setUrl(url));
    }
  }, [currentUser]);

  const handleCreateChannel = () => {
    createChannel({
      name: Math.floor(Math.random() * 1000000),
      userId: currentUser?.uid,
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate(ROUTES.AUTH);
  };

  return {
    data,
    isLoading,
    url,
    currentUser,
    handleCreateChannel,
    handleSignOut,
  };
};
