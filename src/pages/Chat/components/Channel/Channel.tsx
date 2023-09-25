import { ChannelProps } from "./Channel.types";
import useActions from "hooks/useActions";
import { useAppSelector } from "store/hooks";
import { Avatar } from "components";
import TrashIcon from "assets/icons/trash.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "api";
import { getAuth } from "firebase/auth";
import cn from "classnames";
import styles from "./Channel.module.css";

const Channel: React.FC<ChannelProps> = ({ channel }) => {
  const { selectChannel } = useActions();
  const { selectedChannel } = useAppSelector((state) => state.channels);
  const { currentUser } = getAuth();

  const isActive = channel.id === selectedChannel?.id;

  const deleteChannel = async () => {
    const channelDoc = doc(db, "channels", channel.id);
    await deleteDoc(channelDoc);
  };

  return (
    <div
      className={cn(styles.channel, { [styles.active]: isActive })}
      onClick={() => selectChannel(channel)}
    >
      <Avatar className={styles.avatar} />
      <div className={styles.name}>{channel.name}</div>
      {channel.userId === currentUser?.uid && (
        <img
          className={styles.trashIcon}
          src={TrashIcon}
          alt="trashIcon"
          onClick={deleteChannel}
        />
      )}
    </div>
  );
};

export default Channel;
