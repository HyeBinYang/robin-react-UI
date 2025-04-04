import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";
import classNames from "classnames";

type ValueLabelDisplay = "auto" | "on" | "off";

type Props = {
  color?: keyof typeof colors;
  size?: "medium" | "small";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  showMarks?: boolean;
  valueLabelDisplay?: ValueLabelDisplay;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  onChange?: (value: number) => void;
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
  valueLabelDisplay = "auto",
  disabled = false,
  orientation = "horizontal",
  onChange,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [mounted, setMounted] = useState(false);

  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const filledRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const valueLabelRef = useRef<HTMLSpanElement>(null);

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

  const moveThumbByValue = (nextValue: number, callback?: (value: number) => void) => {
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
    const markWidth =
      orientation === "horizontal"
        ? (containerRect.width / (max - min)) * step
        : (containerRect.height / (max - min)) * step;
    const offset = ((nextValue - min) * markWidth) / step;

    if (orientation === "horizontal") {
      thumbRef.current.style.left = `${offset}px`;
      filledRef.current.style.width = `${offset}px`;
    } else {
      thumbRef.current.style.bottom = `${offset}px`;
      filledRef.current.style.height = `${offset}px`;
    }

    callback?.(nextValue);
  };

  useEffect(() => {
    moveThumbByValue(defaultValue);
  }, [defaultValue]);

  const moveThumbByClickedPos = (clickedPos: number) => {
    assert(containerRef.current !== null && filledRef.current !== null && thumbRef.current !== null);

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = orientation === "horizontal" ? containerRect.width : containerRect.height;
    const markWidth = (containerSize / (max - min)) * step;
    const diff = orientation === "horizontal" ? clickedPos - containerRect.left : containerRect.bottom - clickedPos;
    let offset = 0;
    let nextValue: number;

    if (diff <= 0) {
      nextValue = min;
      offset = 0;
    } else if (diff >= containerSize - 2) {
      nextValue = max;
      offset = containerSize;
    } else {
      nextValue = diff ? Math.round(diff / markWidth) * step + min : defaultValue;

      if (nextValue > max) nextValue = max;

      offset = ((nextValue - min) * markWidth) / step;
    }

    if (orientation === "horizontal") {
      thumbRef.current.style.left = `${offset}px`;
      filledRef.current.style.width = `${offset}px`;
    } else {
      thumbRef.current.style.bottom = `${offset}px`;
      filledRef.current.style.height = `${offset}px`;
    }

    assert(typeof nextValue === "number", "변수 'v' 타입이 일치하지 않아요.");
    setValue(() => nextValue);

    if (value !== nextValue) {
      onChange?.(nextValue);
    }
  };

  const handleContainerMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    assert(filledRef.current !== null && thumbRef.current !== null && inputRef.current !== null);

    if (orientation === "horizontal") {
      filledRef.current.style.transition = `width ${ANIMATION_DURATION_MS}ms linear`;
      thumbRef.current.style.transition = `left ${ANIMATION_DURATION_MS}ms linear`;
    } else {
      filledRef.current.style.transition = `height ${ANIMATION_DURATION_MS}ms linear`;
      thumbRef.current.style.transition = `bottom ${ANIMATION_DURATION_MS}ms linear`;
    }

    moveThumbByClickedPos(orientation === "horizontal" ? event.clientX : event.clientY);
    inputRef.current.focus();

    setTimeout(() => {
      assert(filledRef.current !== null && thumbRef.current !== null);

      filledRef.current.style.transition = "";
      thumbRef.current.style.transition = "";
    }, ANIMATION_DURATION_MS);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging.current || disabled) return;
    moveThumbByClickedPos(orientation === "horizontal" ? event.clientX : event.clientY);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight": {
        const nextValue = value + step;
        moveThumbByValue(nextValue < max ? nextValue : max, onChange);
        break;
      }
      case "ArrowDown":
      case "ArrowLeft": {
        const nextValue = value - step;
        moveThumbByValue(nextValue > min ? nextValue : min, onChange);
        break;
      }
      default:
        break;
    }
  };

  const handleThumbMouseEnter = () => {
    assert(valueLabelRef.current !== null);

    if (valueLabelDisplay === "auto") {
      valueLabelRef.current.style.transform =
        orientation === "horizontal" ? "translate(0%, -100%) scale(1)" : "scale(1)";
    }
  };

  const handleThumbMouseLeave = () => {
    assert(valueLabelRef.current !== null);

    if (valueLabelDisplay === "auto") {
      valueLabelRef.current.style.transform =
        orientation === "horizontal" ? "translate(0%, -100%) scale(0)" : "scale(0)";
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
        [styles.vertical]: orientation === "vertical",
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

                const containerSize =
                  orientation === "horizontal" ? containerRef.current.clientWidth : containerRef.current.clientHeight;
                const offset = (containerSize / (max - min)) * step * (index + 1);

                return (
                  <span
                    key={mark}
                    className={styles["slider-mark"]}
                    style={
                      orientation === "horizontal"
                        ? {
                            left: `${offset}px`,
                          }
                        : {
                            bottom: `${offset}px`,
                          }
                    }
                  ></span>
                );
              })}
          </span>
        )}
      </div>
      <div
        ref={thumbRef}
        className={styles["slider-thumb"]}
        onMouseEnter={handleThumbMouseEnter}
        onMouseLeave={handleThumbMouseLeave}
      >
        <span
          ref={valueLabelRef}
          className={classNames({
            [styles["slider-value"]]: true,
            [styles["display-on"]]: valueLabelDisplay === "on",
          })}
        >
          {value}
        </span>
        <input
          ref={inputRef}
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
