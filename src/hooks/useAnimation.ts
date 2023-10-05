import { RefObject } from "react";

interface NewCircleProps {
  posX: number;
  posY: number;
}

export const useAnimation = (ref: RefObject<HTMLElement>) => {
  const animationClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const element = ref.current;
    if (!element) return;

    const { pageX, pageY } = e;
    const { left, top } = element.getBoundingClientRect();

    const posX = pageX - left;
    const posY = pageY - top;

    createCircle({ posX, posY });
  };

  const createCircle = (newCircle: NewCircleProps) => {
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.left = `${newCircle.posX}px`;
    circle.style.top = `${newCircle.posY}px`;

    ref.current?.appendChild(circle);

    setTimeout(() => {
      deleteCircle(circle);
    }, 500);
  };

  const deleteCircle = (element: HTMLSpanElement) => {
    element.remove();
  };

  return animationClick;
};
