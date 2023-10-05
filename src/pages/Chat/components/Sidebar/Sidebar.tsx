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
import AnimationButton from "components/UI/AnimationButton/AnimationButton";
import { useAnimation } from "hooks/useAnimation";
import { useRef } from "react";

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
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationClick = useAnimation(divRef);

  return (
    <div ref={divRef} className={styles.sidebar} onClick={animationClick}>
      <div className={styles.top}>
        <Avatar className={styles.avatar} imageUrl={url} />
        <div className={styles.email}>{currentUser?.email}</div>
      </div>

      <div className={styles.actions}>
        <AnimationButton onClick={handleCreateVisible}>
          <div className={styles.plusIcon} />
        </AnimationButton>
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
