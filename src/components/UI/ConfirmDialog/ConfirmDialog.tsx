import { Modal, Button } from "components/UI";
import { ConfirmDialogProps } from "./ConfirmDialog.types";
import styles from "./ConfirmDIalog.module.css";

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  children,
  confirmText = "Да",
  denyText = "Нет",
  cb,
  close,
}) => {
  const handleOk = () => {
    cb();
    close();
  };
  return (
    <Modal>
      {<div className={styles.text}>{children || "Вы уверены?"}</div>}

      <div className={styles.buttons}>
        <Button onClick={handleOk}>{confirmText}</Button>
        <Button onClick={close}>{denyText}</Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
