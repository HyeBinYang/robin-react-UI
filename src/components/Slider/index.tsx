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
  const valueRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

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

  function moveThumbByValue(v: number) {
    assert(containerRef.current !== null && filledRef.current !== null && thumbRef.current !== null);

    if (v > max) {
      v = max;
      setValue(max);
    } else if (value < min) {
      v = min;
      setValue(min);
    } else {
      setValue(v);
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const n = (containerRect.width / (max - min)) * step;
    const left = ((v - min) * n) / step;

    thumbRef.current.style.left = `${left}px`;
    filledRef.current.style.width = `${left}px`;
  }

  function moveThumb(x: number) {
    assert(containerRef.current !== null && filledRef.current !== null && thumbRef.current !== null);

    const containerRect = containerRef.current.getBoundingClientRect();
    const n = (containerRect.width / (max - min)) * step;
    const diff = x - containerRect.left;
    let left = 0;
    let v: number;

    if (diff <= 0) {
      v = min;
      left = 0;
    } else if (diff >= containerRect.width - 2) {
      v = max;
      left = containerRect.width;
    } else {
      v = diff ? Math.round(diff / n) * step + min : defaultValue;

      if (v > max) v = max;

      left = ((v - min) * n) / step;
    }

    thumbRef.current.style.left = `${left}px`;
    filledRef.current.style.width = `${left}px`;

    assert(typeof v === "number", "변수 'v' 타입이 일치하지 않아요.");

    setValue(() => v);
  }

  const handleContainerMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    assert(filledRef.current !== null && thumbRef.current !== null);

    filledRef.current.style.transition = "width 0.15s linear";
    thumbRef.current.style.transition = "left 0.15s linear";

    moveThumb(event.clientX);

    setTimeout(() => {
      assert(filledRef.current !== null);
      assert(thumbRef.current !== null);

      filledRef.current.style.transition = "";
      thumbRef.current.style.transition = "";
    }, 150);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    moveThumb(event.clientX);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp":
        moveThumbByValue(value + step);
        break;
      case "ArrowDown":
        moveThumbByValue(value - step);
        break;
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
