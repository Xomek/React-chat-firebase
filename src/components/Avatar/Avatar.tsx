import cn from "classnames";
import styles from "./Avatar.module.css";
import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({ className }) => {
  return <div className={cn(styles.avatar, className)}></div>;
};

export default Avatar;
