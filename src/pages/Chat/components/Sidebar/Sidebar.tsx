import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "../../../../api";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { Button, CircularProgress } from "../../../../components/UI";
import { Avatar } from "../../../../components";
import { ChannelType } from "../../../../types";
import { Channel } from "..";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const { currentUser } = getAuth();

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [loading, setLoading] = useState(false);

  const channelsCollectionRef = collection(db, "channels");

  useEffect(() => {
    const q = query(collection(db, "channels"));

    setLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const channels: any[] = [];
      querySnapshot.forEach((doc) => {
        channels.push({ ...doc.data(), id: doc.id });
      });

      setChannels(channels);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createChannel = () => {
    addDoc(channelsCollectionRef, {
      name: Math.floor(Math.random() * 1000000),
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <div className={styles.plusIcon} onClick={createChannel} />
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