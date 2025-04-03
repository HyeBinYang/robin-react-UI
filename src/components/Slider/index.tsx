import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";
import classNames from "classnames";

type Props = {
  color?: keyof typeof colors;
  size?: "medium" | "small";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  showMarks?: boolean;
  showValueLabel?: boolean;
  disabled?: boolean;
};

const ANIMATION_DURATION_MS = 150;

const Slider = ({
  color = DEFAULT_COLOR,
  size = "medium",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = min,
  showMarks = false,
  showValueLabel = false,
  disabled = false,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [mounted, setMounted] = useState(false);
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

    setMounted(true);

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

  useEffect(() => {
    moveThumbByValue(defaultValue);
  }, [defaultValue]);

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
    if (disabled) return;

    assert(filledRef.current !== null && thumbRef.current !== null);

    filledRef.current.style.transition = `width ${ANIMATION_DURATION_MS}ms linear`;
    thumbRef.current.style.transition = `left ${ANIMATION_DURATION_MS}ms linear`;

    moveThumbByClickedX(event.clientX);

    setTimeout(() => {
      assert(filledRef.current !== null && thumbRef.current !== null);

      filledRef.current.style.transition = "";
      thumbRef.current.style.transition = "";
    }, ANIMATION_DURATION_MS);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging.current || disabled) return;
    moveThumbByClickedX(event.clientX);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

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

  const marks = (() => {
    const marks = [];

    for (let value = min; value <= max; value += step) {
      marks.push(value);
    }

    return marks;
  })();

  return (
    <div
      ref={containerRef}
      className={classNames({
        [styles["slider-container"]]: true,
        [styles.small]: size === "small",
        [styles.disabled]: disabled,
      })}
      style={{
        color: colors[color],
      }}
      onMouseDown={handleContainerMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div ref={filledRef} className={styles["slider-filled"]}></div>
      <div className={styles["slider-track"]}>
        {showMarks && (
          <span className={styles["slider-marks"]}>
            {mounted &&
              marks.map((mark, index) => {
                assert(containerRef.current !== null);

                const left = (containerRef.current.clientWidth / (max - min)) * step * (index + 1);

                return (
                  <span
                    key={mark}
                    className={styles["slider-mark"]}
                    style={{
                      left: `${left}px`,
                    }}
                  ></span>
                );
              })}
          </span>
        )}
      </div>
      <div ref={thumbRef} className={styles["slider-thumb"]}>
        {showValueLabel && <span className={styles["slider-value"]}>{value}</span>}
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
