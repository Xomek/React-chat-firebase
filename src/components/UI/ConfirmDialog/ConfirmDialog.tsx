import { Modal, Button } from "components/UI";
import { ConfirmDialogProps } from "./ConfirmDialog.types";
import styles from "./ConfirmDIalog.module.css";

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  children,
  confirmText = "Да",
  denyText = "Нет",
  cb,
  close,
  title = "Вы уверены?",
}) => {
  const handleOk = () => {
    cb();
    close();
  };
  return (
    <Modal title={title}>
      {children}
      <div className={styles.buttons}>
        <Button onClick={handleOk}>{confirmText}</Button>
        <Button onClick={close}>{denyText}</Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
