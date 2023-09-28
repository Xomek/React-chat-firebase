import { MessageProps } from "./Message.types";
import { Avatar } from "components";
import { format } from "date-fns";
import cn from "classnames";
import styles from "./Message.module.css";

const Message: React.FC<MessageProps> = ({ className, message, avatarUrl }) => {
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
      <Avatar className={styles.avatar} imageUrl={avatarUrl} />
    </div>
  );
};

export default Message;
