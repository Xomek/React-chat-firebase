import { Main, Sidebar } from "./components";
import styles from "./Chat.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ROUTES } from "routes/routes.enum";
import { auth } from "utils/firebase";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authListen = onAuthStateChanged(
      auth,
      (user) => !user && navigate(ROUTES.AUTH)
    );

    return () => {
      authListen();
    };
  }, []);

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
