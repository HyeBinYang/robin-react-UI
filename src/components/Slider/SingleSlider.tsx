import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";
import classNames from "classnames";
import useSlider from "./useSlider";
import { ValueLabelDisplay } from "@/types/slider";
import { DefaultColor, DefaultOrientation, DefaultSize } from "@/types/common";

type Props = {
  color?: DefaultColor;
  size?: Exclude<DefaultSize, "large">;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  showMarks?: boolean;
  valueLabelDisplay?: ValueLabelDisplay;
  disabled?: boolean;
  orientation?: DefaultOrientation;
  onChange?: (value: number) => void;
};

const SingleSlider = ({
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
  const {
    marks,
    dragging,
    mounted,
    containerRef,
    filledTrackRef,
    moveThumb,
    showValueLabel,
    hideValueLabel,
  } = useSlider({
    orientation,
    min,
    max,
    step,
    valueLabelDisplay,
  });

  const [value, setValue] = useState(defaultValue);

  const thumbRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const valueLabelRef = useRef<HTMLSpanElement>(null);

  const fillTrack = (offset: number) => {
    assert(filledTrackRef.current, "filledTrackRef를 참조해주세요.");

    if (orientation === "horizontal") {
      filledTrackRef.current.style.width = `${offset}px`;
    } else {
      filledTrackRef.current.style.height = `${offset}px`;
    }
  };

  const moveThumbByValue = (nextValue: number, callback?: (value: number) => void) => {
    assert(containerRef.current !== null && thumbRef.current !== null);

    if (nextValue > max) {
      nextValue = max;
    } else if (nextValue < min) {
      nextValue = min;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = orientation === "horizontal" ? containerRect.width : containerRect.height;
    const widthPerMark = (containerSize / (max - min)) * step;
    const offset = ((nextValue - min) * widthPerMark) / step;

    setValue(nextValue);
    moveThumb(thumbRef.current, offset);
    fillTrack(offset);
    callback?.(nextValue);
  };

  useEffect(() => {
    moveThumbByValue(defaultValue);
  }, [defaultValue]);

  const moveThumbByClickedPos = (clickedPos: number) => {
    assert(containerRef.current !== null && thumbRef.current !== null);

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = orientation === "horizontal" ? containerRect.width : containerRect.height;
    const widthPerMark = (containerSize / (max - min)) * step;
    const diff =
      orientation === "horizontal"
        ? clickedPos - containerRect.left
        : containerRect.bottom - clickedPos;
    let offset = 0;
    let nextValue: number;

    if (diff <= 0) {
      nextValue = min;
      offset = 0;
    } else if (diff >= containerSize - 2) {
      nextValue = max;
      offset = containerSize;
    } else {
      nextValue = diff ? Math.round(diff / widthPerMark) * step + min : defaultValue;

      if (nextValue > max) nextValue = max;

      offset = ((nextValue - min) * widthPerMark) / step;
    }

    setValue(nextValue);
    moveThumb(thumbRef.current, offset);
    fillTrack(offset);

    if (value !== nextValue) {
      onChange?.(nextValue);
    }
  };

  const handleContainerMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    assert(
      filledTrackRef.current !== null && thumbRef.current !== null && inputRef.current !== null
    );

    moveThumbByClickedPos(orientation === "horizontal" ? event.clientX : event.clientY);
    inputRef.current.focus();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;
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
    showValueLabel(valueLabelRef.current);
  };

  const handleThumbMouseLeave = () => {
    assert(valueLabelRef.current !== null);
    hideValueLabel(valueLabelRef.current);
  };

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
      <div ref={filledTrackRef} className={styles["slider-filled"]}></div>
      <div className={styles["slider-track"]}>
        {showMarks && (
          <span className={styles["slider-marks"]}>
            {mounted &&
              marks.map((mark, index) => {
                assert(containerRef.current !== null);

                const containerSize =
                  orientation === "horizontal"
                    ? containerRef.current.clientWidth
                    : containerRef.current.clientHeight;
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

export default SingleSlider;
