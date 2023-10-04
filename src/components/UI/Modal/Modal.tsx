import { ModalProps } from "./Modal.types";
import { createPortal } from "react-dom";
import cn from "classnames";
import styles from "./Modal.module.css";

const Modal: React.FC<ModalProps> = ({ children, className, title }) => {
  return createPortal(
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={cn(styles.modal, className)}>
        {title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
