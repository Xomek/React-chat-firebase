import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../../../api";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../../../../../../store/hooks";
import styles from "./Textarea.module.css";

const Textarea: React.FC = () => {
  const { currentUser } = getAuth();

  const { selectedChannel } = useAppSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState("");
  const messagesCollectionRef = collection(db, "messages");

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addDoc(messagesCollectionRef, {
        userId: currentUser?.uid,
        channelId: selectedChannel?.id,
        text: newMessage,
        createdAt: serverTimestamp(),
      });

      setNewMessage("");
    }
  };

  return (
    <div className={styles.textAreaBox}>
      <input
        className={styles.textarea}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={sendMessage}
        type="text"
        placeholder="Введите ваше сообщение"
      />
    </div>
  );
};

export default Textarea;
