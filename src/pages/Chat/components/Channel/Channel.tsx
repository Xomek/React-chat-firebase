import { ChannelProps } from "./Channel.types";
import useActions from "../../../../hooks/useActions";
import cn from "classnames";
import styles from "./Channel.module.css";
import { useAppSelector } from "../../../../store/hooks";
import { Avatar } from "../../../../components";

const Channel: React.FC<ChannelProps> = ({ channel }) => {
  const { selectChannel } = useActions();
  const { selectedChannel } = useAppSelector((state) => state.chat);

  const isActive = channel.id === selectedChannel?.id;

  return (
    <div
      className={cn(styles.channel, { [styles.active]: isActive })}
      onClick={() => selectChannel(channel)}
    >
      <Avatar className={styles.avatar} />
      <div>{channel.name}</div>
    </div>
  );
};

export default Channel;
