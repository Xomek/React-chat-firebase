import { TextFieldProps } from "./TextField.types";
import cn from "classnames";
import styles from "./TextField.module.css";

const TextField: React.FC<TextFieldProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <input
      className={cn(styles.input, className, { [styles.error]: error })}
      type="text"
      {...props}
    />
  );
};

export default TextField;
