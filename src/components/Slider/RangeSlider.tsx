import React, { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";
import classNames from "classnames";
import useSlider from "./useSlider";

type ValueLabelDisplay = "auto" | "on" | "off";

type Props = {
  color?: keyof typeof colors;
  size?: "medium" | "small";
  min?: number;
  max?: number;
  step?: number;
  defaultValue: [number, number];
  showMarks?: boolean;
  valueLabelDisplay?: ValueLabelDisplay;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  onChange?: (value: [number, number]) => void;
};

const RangeSlider = ({
  color = DEFAULT_COLOR,
  size = "medium",
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
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

  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);
  const minValueLabelRef = useRef<HTMLSpanElement>(null);
  const maxValueLabelRef = useRef<HTMLDivElement>(null);

  const moveMinThumbByValue = (nextValue: number, callback?: (value: [number, number]) => void) => {
    assert(containerRef.current !== null && minThumbRef.current !== null);

    if (nextValue > max) {
      nextValue = max;
    } else if (nextValue < min) {
      nextValue = min;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = orientation === "horizontal" ? containerRect.width : containerRect.height;
    const widthPerMark = (containerSize / (max - min)) * step;
    const offset = ((nextValue - min) * widthPerMark) / step;

    setValue([nextValue, value[1]]);
    moveThumb(minThumbRef.current, offset);
    callback?.([nextValue, value[1]]);
  };

  const moveMaxThumbByValue = (nextValue: number, callback?: (value: [number, number]) => void) => {
    assert(containerRef.current !== null && maxThumbRef.current !== null);

    if (nextValue > max) {
      nextValue = max;
      setValue([value[0], max]);
    } else if (nextValue < min) {
      nextValue = min;
      setValue([value[0], min]);
    } else {
      setValue([value[0], nextValue]);
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const markWidth =
      orientation === "horizontal"
        ? (containerRect.width / (max - min)) * step
        : (containerRect.height / (max - min)) * step;
    const offset = ((nextValue - min) * markWidth) / step;

    setValue([value[0], nextValue]);
    moveThumb(maxThumbRef.current, offset);
    callback?.([value[0], nextValue]);
  };

  useEffect(() => {
    moveMinThumbByValue(defaultValue[0]);
    moveMaxThumbByValue(defaultValue[1]);
  }, [defaultValue]);

  const getIsMinThumbClose = (clickedPos: number) => {
    assert(minThumbRef.current !== null && maxThumbRef.current !== null);

    const minThumbRect = minThumbRef.current.getBoundingClientRect();
    const maxThumbRect = maxThumbRef.current.getBoundingClientRect();
    const distanceMinThumb =
      orientation === "horizontal"
        ? Math.abs(minThumbRect.left + minThumbRect.width / 2 - clickedPos)
        : Math.abs(minThumbRect.top + minThumbRect.height / 2 - clickedPos);
    const distanceMaxThumb =
      orientation === "horizontal"
        ? Math.abs(maxThumbRect.left + minThumbRect.width / 2 - clickedPos)
        : Math.abs(maxThumbRect.top + minThumbRect.height / 2 - clickedPos);

    return distanceMinThumb < distanceMaxThumb;
  };

  const moveThumbByClickedPos = (clickedPos: number) => {
    assert(
      containerRef.current !== null &&
        minThumbRef.current !== null &&
        maxThumbRef.current !== null &&
        minValueLabelRef.current !== null &&
        maxValueLabelRef.current !== null &&
        minInputRef.current !== null &&
        maxInputRef.current !== null
    );

    const isMinThumbClose = getIsMinThumbClose(clickedPos);
    const thumbElement = isMinThumbClose ? minThumbRef.current : maxThumbRef.current;
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
      nextValue = diff
        ? Math.round(diff / widthPerMark) * step + min
        : isMinThumbClose
        ? defaultValue[0]
        : defaultValue[1];
      if (nextValue > max) nextValue = max;
      offset = ((nextValue - min) * widthPerMark) / step;
    }

    if (valueLabelDisplay === "auto") {
      if (isMinThumbClose) {
        minValueLabelRef.current.style.transform =
          orientation === "horizontal" ? "translate(0%, -100%) scale(1)" : "scale(1)";
        maxValueLabelRef.current.style.transform =
          orientation === "horizontal" ? "translate(0%, -100%) scale(0)" : "scale(0)";
      } else {
        minValueLabelRef.current.style.transform =
          orientation === "horizontal" ? "translate(0%, -100%) scale(0)" : "scale(0)";
        maxValueLabelRef.current.style.transform =
          orientation === "horizontal" ? "translate(0%, -100%) scale(1)" : "scale(1)";
      }
    }

    setValue((prev) => (isMinThumbClose ? [nextValue, prev[1]] : [prev[0], nextValue]));
    moveThumb(thumbElement, offset);

    if (isMinThumbClose) {
      minInputRef.current.focus();
      if (nextValue !== value[0]) onChange?.([nextValue, value[1]]);
    } else {
      maxInputRef.current.focus();
      if (nextValue !== value[1]) onChange?.([value[0], nextValue]);
    }
  };

  const handleContainerMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    assert(filledTrackRef.current !== null);

    const clickedPos = orientation === "horizontal" ? event.clientX : event.clientY;
    moveThumbByClickedPos(clickedPos);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;

    assert(minThumbRef.current !== null && maxThumbRef.current !== null);

    const clickedPos = orientation === "horizontal" ? event.clientX : event.clientY;
    moveThumbByClickedPos(clickedPos);
  };

  const handleKeyDown =
    (value: number, isMin: boolean) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowUp":
        case "ArrowRight": {
          const nextValue = value + step;
          isMin
            ? moveMinThumbByValue(nextValue < max ? nextValue : max, onChange)
            : moveMaxThumbByValue(nextValue < max ? nextValue : max, onChange);
          break;
        }
        case "ArrowDown":
        case "ArrowLeft": {
          const nextValue = value - step;
          isMin
            ? moveMinThumbByValue(nextValue > min ? nextValue : min, onChange)
            : moveMaxThumbByValue(nextValue > min ? nextValue : min, onChange);
          break;
        }
        default:
          break;
      }
    };

  const handleThumbMouseEnter = (isMin: boolean) => () => {
    const valueLabelRef = isMin ? minValueLabelRef.current : maxValueLabelRef.current;

    assert(valueLabelRef !== null);
    showValueLabel(valueLabelRef);
  };

  const handleThumbMouseLeave = (isMin: boolean) => () => {
    const valueLabelRef = isMin ? minValueLabelRef.current : maxValueLabelRef.current;

    assert(valueLabelRef !== null);
    hideValueLabel(valueLabelRef);
  };

  const fillTrack = () => {
    assert(
      minThumbRef.current !== null &&
        maxThumbRef.current !== null &&
        filledTrackRef.current !== null
    );

    const minThumbRect = minThumbRef.current.getBoundingClientRect();
    const maxThumbRect = maxThumbRef.current.getBoundingClientRect();

    if (orientation === "horizontal") {
      const minThumbLeft = minThumbRect.left;
      const maxThumbLeft = maxThumbRect.left;
      const width = Math.abs(maxThumbLeft - minThumbLeft);
      const left = Math.min(minThumbLeft, maxThumbLeft);

      filledTrackRef.current.style.left = `${left}px`;
      filledTrackRef.current.style.width = `${width}px`;
    } else {
      const minThumbTop = minThumbRect.top;
      const maxThumbTop = maxThumbRect.top;
      const height = Math.abs(maxThumbTop - minThumbTop);
      const top = Math.min(minThumbTop, maxThumbTop);

      filledTrackRef.current.style.top = `${top}px`;
      filledTrackRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    fillTrack();
  }, [value[0], value[1]]);

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
        ref={minThumbRef}
        className={styles["slider-thumb"]}
        onMouseEnter={handleThumbMouseEnter(true)}
        onMouseLeave={handleThumbMouseLeave(true)}
      >
        <span
          ref={minValueLabelRef}
          className={classNames({
            [styles["slider-value"]]: true,
            [styles["display-on"]]: valueLabelDisplay === "on",
          })}
        >
          {value[0]}
        </span>
        <input
          ref={minInputRef}
          className={styles["slider-input"]}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          readOnly
          onKeyDown={handleKeyDown(value[0], true)}
        />
      </div>
      <div
        ref={maxThumbRef}
        className={styles["slider-thumb"]}
        onMouseEnter={handleThumbMouseEnter(false)}
        onMouseLeave={handleThumbMouseLeave(false)}
      >
        <span
          ref={maxValueLabelRef}
          className={classNames({
            [styles["slider-value"]]: true,
            [styles["display-on"]]: valueLabelDisplay === "on",
          })}
        >
          {value[1]}
        </span>
        <input
          ref={maxInputRef}
          className={styles["slider-input"]}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          readOnly
          onKeyDown={handleKeyDown(value[1], false)}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
