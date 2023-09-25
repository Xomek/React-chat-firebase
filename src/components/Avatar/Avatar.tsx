import cn from "classnames";
import styles from "./Avatar.module.css";
import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({ className, imageUrl }) => {
  return (
    <div className={cn(styles.avatar, className)}>
      {imageUrl && <img src={imageUrl} alt="logo" />}
    </div>
  );
};

export default Avatar;
