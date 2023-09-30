import { ChannelProps } from "./Channel.types";
import useActions from "hooks/useActions";
import { useAppSelector } from "store/hooks";
import TrashIcon from "assets/icons/trash.svg";
import { getAuth } from "firebase/auth";
import { Avatar } from "components/UI";
import { useDeleteChannelMutation } from "api/Chat/Chat.api";
import cn from "classnames";
import styles from "./Channel.module.css";

const Channel: React.FC<ChannelProps> = ({ channel }) => {
  const { currentUser } = getAuth();
  const { selectChannel } = useActions();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const [deleteChannel] = useDeleteChannelMutation();

  const isActive = channel.id === selectedChannel?.id;

  const handleDeleteChannel = async () => {
    deleteChannel(channel.id);
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
          onClick={handleDeleteChannel}
        />
      )}
    </div>
  );
};

export default Channel;
