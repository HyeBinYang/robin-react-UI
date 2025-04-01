import React, { ChangeEventHandler, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";
import Typography from "../Typography";

type Props = {
  color?: keyof typeof colors;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
};

const Slider = ({ color = DEFAULT_COLOR, defaultValue = 0, min = 0, max = 100, step }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const valueRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const slider = event.target;
    const sliderValue = Number(event.target.value);

    setValue(sliderValue);

    assert(valueRef.current);
    assert(trackRef.current);

    const percent = (sliderValue - min) / (max - min);

    const sliderWidth = slider.offsetWidth;
    const thumbWidth = 24;
    const offset = percent * (sliderWidth - thumbWidth) + thumbWidth / 2;

    valueRef.current.style.left = `${offset}px`;
    trackRef.current.style.width = `${percent * 100}%`;
  };

  return (
    <span
      className={styles["slider-container"]}
      style={{
        color: colors[color],
      }}
      onChange={handleChange}
    >
      <span className={styles["slider-rail"]}></span>
      <span ref={trackRef} className={styles["slider-track"]}></span>
      <input className={styles["slider-input"]} type="range" value={value} min={min} max={max} step={step} />
      <span className={styles["slider-value"]} ref={valueRef}>
        <Typography font="Body4Regular" color="White">
          {value}
        </Typography>
      </span>
    </span>
  );
};

export default Slider;
