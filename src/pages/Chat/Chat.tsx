import { Main, Sidebar } from "./components";
import styles from "./Chat.module.css";

const Chat: React.FC = () => {
  return (
    <div className="app">
      <div className={styles.chat}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Chat;
