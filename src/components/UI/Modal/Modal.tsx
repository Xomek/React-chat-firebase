import { ModalProps } from "./Modal.types";
import { createPortal } from "react-dom";
import cn from "classnames";
import styles from "./Modal.module.css";

const Modal: React.FC<ModalProps> = ({ children, className }) => {
  return createPortal(
    <div className={styles.wrapper}>
      <div className={cn(styles.modal, className)}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
