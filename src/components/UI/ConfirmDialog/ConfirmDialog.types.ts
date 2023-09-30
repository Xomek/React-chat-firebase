import { ModalProps } from "../Modal/Modal.types";

export interface ConfirmDialogProps extends ModalProps {
  cb: () => void;
  close: () => void;
  confirmText?: string;
  denyText?: string;
}
