import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useCreateNewMessageMutation } from "api/Chat/Chat.api";
import { useAppSelector } from "store/hooks";
import EmojiPicker from "emoji-picker-react";
import styles from "./Textarea.module.css";

const Textarea: React.FC = () => {
  const { currentUser } = getAuth();
  const { selectedChannel } = useAppSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [createNewMessage] = useCreateNewMessageMutation();

  const handleCreateMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createNewMessage({
        userId: currentUser?.uid,
        channelId: selectedChannel?.id,
        text: newMessage,
      });

      setNewMessage("");
    }
  };

  return (
    <div className={styles.textAreaBox}>
      <div className={styles.emojiPicker}>
        {pickerVisible ? (
          <EmojiPicker
            onEmojiClick={(e) => {
              setNewMessage((prevState) => prevState + e.emoji);
              setPickerVisible((prevState) => !prevState);
            }}
          />
        ) : (
          <div
            className={styles.picker}
            onClick={() => setPickerVisible((prevState) => !prevState)}
          >
            😊
          </div>
        )}
      </div>

      <input
        className={styles.textarea}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleCreateMessage}
        type="text"
        placeholder="Введите ваше сообщение"
      />
    </div>
  );
};

export default Textarea;
