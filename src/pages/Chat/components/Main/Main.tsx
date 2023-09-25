import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Message } from "..";
import { db } from "../../../../api";
import CircilarProgress from "../../../../components/UI/CircilarProgress";
import { useAppSelector } from "../../../../store/hooks";
import { MessageType } from "../../../../types";
import { Textarea } from "./components";
import cn from "classnames";
import styles from "./Main.module.css";

const Main: React.FC = () => {
  const { selectedChannel } = useAppSelector((state) => state.chat);

  const { currentUser } = getAuth();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    if (selectedChannel) {
      setLoading(true);

      const q = query(
        messagesCollectionRef,
        where("channelId", "==", selectedChannel.id),
        orderBy("createdAt", "asc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });

        setMessages(messages);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [selectedChannel]);

  return (
    <>
      {selectedChannel ? (
        <div className={styles.main}>
          <div className={styles.channelName}>{selectedChannel.name}</div>

          {loading ? (
            <div className={styles.loader}>
              <CircilarProgress />
            </div>
          ) : (
            <div className={styles.scroll}>
              <div className={styles.messages}>
                {messages.length ? (
                  messages.map((message) => (
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
