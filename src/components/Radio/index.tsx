import React, { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import classNames from "classnames";

type RadioSize = "large" | "medium" | "small";
type RadioColor = keyof typeof colors;
type Props = {
  size?: RadioSize;
  color?: RadioColor;
  label?: string;
  checked: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">;

type IconProps = {
  size: RadioSize;
  color: RadioColor;
  disabled?: boolean;
};

const CheckedIcon = ({ size, color, disabled }: IconProps) => {
  const disabledColor = colors["Gray300"];
  const iconColor = disabled ? disabledColor : colors[color];

  switch (size) {
    case "small":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke={iconColor} strokeWidth="2" />
          <circle cx="10" cy="10" r="4" fill={iconColor} />
        </svg>
      );

    case "medium":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="2" />
          <circle cx="12" cy="12" r="5" fill={iconColor} />
        </svg>
      );
    case "large":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="12" stroke={iconColor} strokeWidth="2" />
          <circle cx="14" cy="14" r="6" fill={iconColor} />
        </svg>
      );
  }
};

const UncheckedIcon = ({ size }: Pick<IconProps, "size">) => {
  const iconColor = colors["Gray300"];

  switch (size) {
    case "small":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke={iconColor} strokeWidth="2" />
        </svg>
      );

    case "medium":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="2" />
        </svg>
      );
    case "large":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="12" stroke={iconColor} strokeWidth="2" />
        </svg>
      );
  }
};

const Radio = ({ size = "medium", color = DEFAULT_COLOR, label, checked, onChange, ...inputProps }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputProps.disabled) return;
    onChange?.(event);
  };

  return (
    <label
      className={classNames({
        [styles["radio-container"]]: true,
        [styles.large]: size === "large",
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
        [styles.disabled]: inputProps.disabled,
      })}
    >
      <input {...inputProps} className={styles["radio-input"]} type="radio" checked={checked} onChange={handleChange} />
      {checked ? (
        <CheckedIcon color={color} size={size} disabled={inputProps.disabled} />
      ) : (
        <UncheckedIcon size={size} />
      )}
      {label && <span className={styles["radio-label"]}>{label}</span>}
    </label>
  );
};

export default Radio;
