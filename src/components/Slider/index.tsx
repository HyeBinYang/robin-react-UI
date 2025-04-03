import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";

type Props = {
  color?: keyof typeof colors;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

const Slider = ({ color = DEFAULT_COLOR, min = 0, max = 100, step = 1, defaultValue = min }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const filledRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = () => {
      dragging.current = true;
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const moveThumbByValue = (nextValue: number) => {
    assert(containerRef.current !== null && filledRef.current !== null && thumbRef.current !== null);

    if (nextValue > max) {
      nextValue = max;
      setValue(max);
    } else if (value < min) {
      nextValue = min;
      setValue(min);
    } else {
      setValue(nextValue);
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const markWidth = (containerRect.width / (max - min)) * step;
    const left = ((nextValue - min) * markWidth) / step;

    thumbRef.current.style.left = `${left}px`;
    filledRef.current.style.width = `${left}px`;
  };

  const moveThumbByClickedX = (clickedX: number) => {
    assert(containerRef.current !== null && filledRef.current !== null && thumbRef.current !== null);

    const containerRect = containerRef.current.getBoundingClientRect();
    const markWidth = (containerRect.width / (max - min)) * step;
    const diff = clickedX - containerRect.left;
    let left = 0;
    let nextValue: number;

    if (diff <= 0) {
      nextValue = min;
      left = 0;
    } else if (diff >= containerRect.width - 2) {
      nextValue = max;
      left = containerRect.width;
    } else {
      nextValue = diff ? Math.round(diff / markWidth) * step + min : defaultValue;

      if (nextValue > max) nextValue = max;

      left = ((nextValue - min) * markWidth) / step;
    }

    thumbRef.current.style.left = `${left}px`;
    filledRef.current.style.width = `${left}px`;

    assert(typeof nextValue === "number", "변수 'v' 타입이 일치하지 않아요.");
    setValue(() => nextValue);
  };

  const handleContainerMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    assert(filledRef.current !== null && thumbRef.current !== null);

    filledRef.current.style.transition = "width 0.15s linear";
    thumbRef.current.style.transition = "left 0.15s linear";

    moveThumbByClickedX(event.clientX);

    setTimeout(() => {
      assert(filledRef.current !== null && thumbRef.current !== null);

      filledRef.current.style.transition = "";
      thumbRef.current.style.transition = "";
    }, 150);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    moveThumbByClickedX(event.clientX);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp": {
        const nextValue = value + step;
        moveThumbByValue(nextValue < max ? nextValue : max);
        break;
      }
      case "ArrowDown": {
        const nextValue = value - step;
        moveThumbByValue(nextValue > min ? nextValue : min);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles["slider-container"]}
      style={{
        color: colors[color],
      }}
      onMouseDown={handleContainerMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div ref={filledRef} className={styles["slider-filled"]}></div>
      <div className={styles["slider-track"]}></div>
      <div ref={thumbRef} className={styles["slider-thumb"]}>
        <div className={styles["slider-value"]}>{value}</div>
        <input
          className={styles["slider-input"]}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          readOnly
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Slider;
