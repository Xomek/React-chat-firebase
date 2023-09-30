import { Modal, Button } from "components/UI";
import { ConfirmDialogProps } from "./ConfirmDialog.types";

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
      {children}
      <Button onClick={handleOk}>{confirmText}</Button>
      <Button onClick={close}>{denyText}</Button>
    </Modal>
  );
};

export default ConfirmDialog;
