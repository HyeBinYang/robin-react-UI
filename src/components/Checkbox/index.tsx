import React, { useId, useState } from "react";
import style from "./Checkbox.module.css";
import colors from "../../constant/color";
import classNames from "classnames";
import { DEFAULT_COLOR } from "../../constant/common";

type CheckboxSize = "large" | "medium" | "small";
type CheckboxColor = keyof typeof colors;
type Props = {
  id?: string;
  size?: CheckboxSize;
  color?: CheckboxColor;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">;

type IconProps = {
  size: CheckboxSize;
  color: CheckboxColor;
};

const CheckedIcon = ({ size, color }: IconProps) => {
  switch (size) {
    case "small":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="3" fill={colors[color]} />
          <path d="M5 10.5L9 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "medium":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill={colors[color]} />
          <path d="M6 12.5L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "large":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="4" fill={colors[color]} />
          <path d="M7 14.5L12 19L21 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

const UncheckedIcon = ({ size }: Pick<IconProps, "size">) => {
  switch (size) {
    case "small":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="18" height="18" rx="3" stroke="#E0E0E0" strokeWidth="2" />
        </svg>
      );

    case "medium":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="22" rx="4" stroke="#E0E0E0" strokeWidth="2" />
        </svg>
      );
    case "large":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#E0E0E0" strokeWidth="2" />
        </svg>
      );
  }
};

const Checkbox = ({ id, size = "medium", color = DEFAULT_COLOR, label, onChange, ...props }: Props) => {
  const defaultId = useId();
  const [checked, setChecked] = useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label className={style.label} htmlFor={id || defaultId}>
      <input
        className={style["checkbox-input"]}
        {...props}
        id={id || defaultId}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {checked ? <CheckedIcon size={size} color={color} /> : <UncheckedIcon size={size} />}
      <span className={classNames({ [style["checkbox-label"]]: true, [style.small]: size === "small" })}>{label}</span>
    </label>
  );
};

export default Checkbox;
