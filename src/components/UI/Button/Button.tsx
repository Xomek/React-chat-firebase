import { forwardRef } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button className={cn(styles.button, className)} ref={ref} {...props}>
      {children}
    </button>
  );
});

export default Button;
