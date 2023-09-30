import { Button, CircularProgress } from "components/UI";
import { Avatar } from "components/UI";
import ChannelList from "./components/ChannelList/ChannelList";
import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const { isLoading, handleCreateChannel, handleSignOut, url, currentUser } =
    useSidebar();

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} imageUrl={url} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <Button onClick={handleCreateChannel}>
          <div className={styles.plusIcon} />
        </Button>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <ChannelList />
      )}

      <Button onClick={handleSignOut}>Выход</Button>
    </div>
  );
};

export default Sidebar;
