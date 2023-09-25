import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth, db, storage } from "../../../../api";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { Button, CircularProgress } from "../../../../components/UI";
import { Avatar } from "../../../../components";
import { ChannelType } from "../../../../types";
import { Channel } from "..";
import { useAppSelector } from "../../../../store/hooks";
import useActions from "../../../../hooks/useActions";
import styles from "./Sidebar.module.css";
import { getDownloadURL, ref } from "firebase/storage";

const Sidebar: React.FC = () => {
  const { currentUser } = getAuth();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const { selectChannel } = useActions();

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const storageRef = ref(storage, "images");
  const channelsCollectionRef = collection(db, "channels");

  useEffect(() => {
    const q = query(collection(db, "channels"));

    setLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const channels: any[] = [];
      querySnapshot.forEach((doc) => {
        channels.push({ ...doc.data(), id: doc.id });
      });

      if (!channels.find((channel) => channel.id === selectedChannel?.id)) {
        selectChannel(null);
      }

      setChannels(channels);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getDownloadURL(storageRef).then((url) => setUrl(url));
  }, []);

  const createChannel = () => {
    addDoc(channelsCollectionRef, {
      name: Math.floor(Math.random() * 1000000),
      userId: currentUser?.uid,
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} imageUrl={url} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <Button onClick={createChannel}>
          <div className={styles.plusIcon} />
        </Button>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.channels}>
          {channels?.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
        </div>
      )}

      <Button onClick={() => signOut(auth)}>Выход</Button>
    </div>
  );
};

export default Sidebar;
