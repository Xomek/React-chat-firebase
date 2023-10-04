import {
  Avatar,
  ConfirmDialog,
  TextField,
  Button,
  CircularProgress,
} from "components/UI";
import ChannelList from "./components/ChannelList/ChannelList";
import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const {
    isLoading,
    handleCreateVisible,
    handleSignOut,
    url,
    currentUser,
    createModalVisible,
    handleCreateChannel,
    setNewChannelName,
    newChannelName,
  } = useSidebar();

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} imageUrl={url} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <Button onClick={handleCreateVisible}>
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

      {createModalVisible && (
        <ConfirmDialog
          title="Создание нового канала"
          cb={handleCreateChannel}
          close={handleCreateVisible}
        >
          <TextField
            className={styles.createChannelInput}
            placeholder="Название канала"
            onChange={(e) => setNewChannelName(e.target.value)}
            value={newChannelName}
          />
        </ConfirmDialog>
      )}
    </div>
  );
};

export default Sidebar;
