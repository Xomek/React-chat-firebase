import { MessageProps } from "./Message.types";
import { Avatar } from "components";
import { format } from "date-fns";
import cn from "classnames";
import styles from "./Message.module.css";
import { storage } from "api";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

const Message: React.FC<MessageProps> = ({ className, message }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (message.userId) {
      const storageRef = ref(storage, `images/${message.userId}`);
      getDownloadURL(storageRef).then((url) => setUrl(url));
    }
  }, [message]);

  return (
    <div className={cn(styles.message, className)}>
      <div className={styles.text}>
        <div className={styles.date}>
          {message.createdAt
            ? format(message.createdAt.toDate(), "dd-MM-yyyy kk:mm")
            : "00-00-0000 00:00"}
        </div>
        {message.text}
      </div>
      <Avatar className={styles.avatar} imageUrl={url} />
    </div>
  );
};

export default Message;
