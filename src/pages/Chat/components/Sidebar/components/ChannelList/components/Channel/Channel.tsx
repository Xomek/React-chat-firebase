import { ChannelProps } from "./Channel.types";
import useActions from "hooks/useActions";
import { useAppSelector } from "store/hooks";
import TrashIcon from "assets/icons/trash.svg";
import { getAuth } from "firebase/auth";
import { Avatar } from "components/UI";
import { useDeleteChannelMutation } from "api/Chat/Chat.api";
import { ConfirmDialog } from "components/UI/index";
import { useState } from "react";
import cn from "classnames";
import styles from "./Channel.module.css";

const Channel: React.FC<ChannelProps> = ({ channel }) => {
  const { currentUser } = getAuth();
  const { selectChannel } = useActions();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const [deleteChannel] = useDeleteChannelMutation();
  const [confirmDialog, setConfirmDialog] = useState(false);

  const isActive = channel.id === selectedChannel?.id;

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
          onClick={(e) => {
            e.stopPropagation();
            setConfirmDialog(true);
          }}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          close={() => setConfirmDialog(false)}
          cb={() => deleteChannel(channel.id)}
        >
          Удалить канал? {channel.name}
        </ConfirmDialog>
      )}
    </div>
  );
};

export default Channel;
