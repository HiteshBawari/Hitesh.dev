import { useEffect } from "react";

export default function useMagnetic(
  ref
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const move = (e) => {
      const rect =
        element.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.15}px, ${
          y * 0.15
        }px)`;
    };

    const leave = () => {
      element.style.transform =
        "translate(0px,0px)";
    };

    element.addEventListener(
      "mousemove",
      move
    );

    element.addEventListener(
      "mouseleave",
      leave
    );

    return () => {
      element.removeEventListener(
        "mousemove",
        move
      );

      element.removeEventListener(
        "mouseleave",
        leave
      );
    };
  }, [ref]);
}