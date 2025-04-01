// import React, { useRef, useState } from "react";
// import styles from "./Slider.module.css";

// type DiscreteSliderProps = {
//   min?: number;
//   max?: number;
//   step?: number;
//   defaultValue?: number;
//   onChange?: (value: number) => void;
// };

// const Slider: React.FC<DiscreteSliderProps> = ({ min = 0, max = 100, step = 10, defaultValue = 0, onChange }) => {
//   const [value, setValue] = useState(defaultValue);

//   const rangeRef = useRef<HTMLInputElement>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = Number(e.target.value);
//     setValue(newValue);
//     onChange?.(newValue);
//   };

//   const calcThumbPosition = () => {
//     const percent = ((value - min) / (max - min)) * 100;
//     return `calc(${percent}% - 12px)`;
//   };

//   const marks = [];
//   for (let i = min; i <= max; i += step) {
//     const percent = ((i - min) / (max - min)) * 100;
//     marks.push({ value: i, percent });
//   }

//   return (
//     <div className={styles["slider-container"]}>
//       {/* 현재 값 표시 */}
//       <div className={styles["slider-value-label"]} style={{ left: calcThumbPosition() }}>
//         {value}
//       </div>

//       {/* 슬라이더 */}
//       <input
//         ref={rangeRef}
//         type="range"
//         className={styles["styled-slider"]}
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={handleChange}
//       />

//       {/* 눈금 표시 */}
//       <div className={styles["slider-marks"]}>
//         {marks.map((mark) => (
//           <div key={mark.value} className={styles["slider-mark"]} style={{ left: `${mark.percent}%` }}>
//             <div className={styles["slider-mark-line"]} />
//             <div className={styles["slider-mark-label"]}>{mark.value}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import styles from "./Slider.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import assert from "../../utils/assert";

type Props = {
  color?: keyof typeof colors;
  defaultValue?: number;
};

const Slider = ({ color = DEFAULT_COLOR, defaultValue = 0 }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const valueRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);

    setValue(Number(event.target.value));

    assert(valueRef.current);
    assert(trackRef.current);

    valueRef.current.style.left = `${event.target.value}%`;
    trackRef.current.style.width = `${event.target.value}%`;
  };

  return (
    <span
      className={styles["slider-container"]}
      style={{
        color: colors[color],
      }}
    >
      <span className={styles["slider-rail"]}></span>
      <span ref={trackRef} className={styles["slider-track"]}></span>
      <input className={styles["slider-input"]} type="range" value={value} onChange={handleChange} />
      {/* <span className={styles["slider-value"]} ref={valueRef}>
        {value}
      </span> */}
    </span>
  );
};

export default Slider;
