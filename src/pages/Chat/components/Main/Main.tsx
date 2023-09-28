import { getAuth } from "firebase/auth";
import CircilarProgress from "components/UI/CircilarProgress";
import { useAppSelector } from "store/hooks";
import { Message, Textarea } from "./components";
import { useGetChannelMessagesQuery } from "api/Chat/Chat.api";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "utils/firebase";
import cn from "classnames";
import styles from "./Main.module.css";

const Main: React.FC = () => {
  const { currentUser } = getAuth();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const { data, isLoading, refetch } = useGetChannelMessagesQuery(
    selectedChannel?.id
  );

  useEffect(() => {
    if (selectedChannel) {
      const q = query(collection(db, "messages"));
      const unsubscribe = onSnapshot(q, () => refetch());

      return () => unsubscribe();
    }
  }, [selectedChannel]);

  return (
    <>
      {selectedChannel ? (
        <div className={styles.main}>
          <div className={styles.channelName}>{selectedChannel.name}</div>

          {isLoading ? (
            <div className={styles.loader}>
              <CircilarProgress />
            </div>
          ) : (
            <div className={styles.scroll}>
              <div className={styles.messages}>
                {data?.length ? (
                  data?.map((message) => (
                    <Message
                      key={message.id}
                      className={cn(styles.message, {
                        [styles.notMe]:
                          currentUser?.uid !== message.userId.toString(),
                      })}
                      message={message}
                    />
                  ))
                ) : (
                  <div className={styles.infoMessage}>
                    Напишите сообщение первым!
                  </div>
                )}
              </div>
            </div>
          )}

          <Textarea />
        </div>
      ) : (
        <div className={styles.infoMessage}>
          Для общения выберите или создайте канал
        </div>
      )}
    </>
  );
};

export default Main;
