import React from "react";
import colors from "../../constant/color";
import SingleSlider from "./SingleSlider";
import RangeSlider from "./RangeSlider";

type ValueLabelDisplay = "auto" | "on" | "off";

type Props = {
  color?: keyof typeof colors;
  size?: "medium" | "small";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | [number, number];
  showMarks?: boolean;
  valueLabelDisplay?: ValueLabelDisplay;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  onChange?: (value: number | [number, number]) => void;
};

const Slider = (props: Props) => {
  return (
    <>
      {!props.defaultValue || typeof props.defaultValue === "number" ? (
        <SingleSlider {...props} defaultValue={props.defaultValue} />
      ) : (
        <RangeSlider {...props} defaultValue={props.defaultValue} />
      )}
    </>
  );
};

export default Slider;
