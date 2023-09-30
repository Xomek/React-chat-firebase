import { Channel } from "./components";
import { useGetChannelsQuery } from "api/Chat/Chat.api";
import styles from "./ChannelList.module.css";

const ChannelList: React.FC = () => {
  const { data } = useGetChannelsQuery();

  return (
    <div className={styles.channels}>
      {data?.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </div>
  );
};

export default ChannelList;
