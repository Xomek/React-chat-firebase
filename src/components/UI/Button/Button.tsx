import cn from "classnames";
import styles from "./Button.module.css";

const Button: React.FC<React.ComponentProps<"button">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
