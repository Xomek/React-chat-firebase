import styles from "./TextField.module.css";

const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <input className={styles.input} type="text" {...props} />;
};

export default TextField;
