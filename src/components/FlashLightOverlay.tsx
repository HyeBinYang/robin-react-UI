import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const FlashLightOverlay = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      css={css`
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        backdrop-filter: brightness(0.03);
        mask-image: radial-gradient(
          circle 120px at ${position.x}px ${position.y}px,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 1) 100%
        );
        mask-composite: exclude;
        transition: mask-image 0.05s linear;
      `}
    />
  );
};

export default FlashLightOverlay;
