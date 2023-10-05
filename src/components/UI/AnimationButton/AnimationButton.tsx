import { Button } from "components/UI";
import { useAnimation } from "hooks/useAnimation";
import { useRef } from "react";

const AnimationButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, ...props }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const animationClick = useAnimation(buttonRef);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick && onClick(e);
    animationClick(e);
  };

  return (
    <Button ref={buttonRef} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default AnimationButton;
