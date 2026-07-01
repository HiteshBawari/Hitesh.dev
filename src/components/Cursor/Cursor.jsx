import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef();

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
      });
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
      hidden lg:block

      fixed
      top-0
      left-0

      w-6
      h-6

      rounded-full

      border
      border-indigo-500

      pointer-events-none

      z-[9999]

      -translate-x-1/2
      -translate-y-1/2
      "
    />
  );
}