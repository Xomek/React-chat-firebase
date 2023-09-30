import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { Button, CircularProgress } from "components/UI";
import { Avatar } from "components/UI";
import { auth, db, storage } from "utils/firebase";
import { useAppSelector } from "store/hooks";
import useActions from "hooks/useActions";
import ChannelList from "./components/ChannelList/ChannelList";
import {
  useCreateChannelMutation,
  useGetChannelsQuery,
} from "api/Chat/Chat.api";
import { ref, getDownloadURL } from "firebase/storage";
import { ROUTES } from "routes/routes.enum";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
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
    if (data) {
      if (!data.find((channel) => channel.id === selectedChannel?.id)) {
        selectChannel(null);
      }
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

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} imageUrl={url} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <Button onClick={handleCreateChannel}>
          <div className={styles.plusIcon} />
        </Button>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <ChannelList />
      )}

      <Button onClick={handleSignOut}>Выход</Button>
    </div>
  );
};

export default Sidebar;
