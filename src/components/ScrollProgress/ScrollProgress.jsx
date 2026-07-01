import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] =
    useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        (window.scrollY / total) *
        100;

      setWidth(progress);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div
      className="
      fixed
      top-0
      left-0
      z-[9999]

      h-[4px]

      bg-gradient-to-r
      from-indigo-500
      via-purple-500
      to-cyan-500
      "
      style={{
        width: `${width}%`,
      }}
    />
  );
}