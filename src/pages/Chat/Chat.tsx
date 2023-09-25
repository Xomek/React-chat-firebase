import { Main, Sidebar } from "./components";
import styles from "./Chat.module.css";

const Chat: React.FC = () => {
  return (
    <div className={styles.chat}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Chat;
