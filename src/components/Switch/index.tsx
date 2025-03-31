import React, { useState } from "react";
import styles from "./Switch.module.css";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import classNames from "classnames";
import Typography from "../Typography";

type Props = {
  label?: string;
  color?: keyof typeof colors;
  size?: "medium" | "small";
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onToggle?: (value: boolean) => void;
};

const Switch = ({
  label,
  color = DEFAULT_COLOR,
  size = "medium",
  checked: propsChecked = false,
  disabled,
  required = false,
  onToggle,
}: Props) => {
  const [checked, setChecked] = useState(propsChecked);

  const backgroundColor = checked ? colors[color] : colors["Gray400"];

  const handleToggle = () => {
    if (disabled) return;

    setChecked(!checked);
    onToggle?.(!checked);
  };

  const Container = (
    <span
      className={classNames({
        [styles.container]: true,
        [styles.checked]: checked,
        [styles.disabled]: !label && disabled,
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      onClick={!label ? handleToggle : undefined}
    >
      <span className={styles.thumb} style={{ backgroundColor }}></span>
      <span className={styles.track} style={{ backgroundColor }}></span>
    </span>
  );

  return (
    <>
      {label ? (
        <label
          className={classNames({
            [styles.label]: true,
            [styles.disabled]: label && disabled,
          })}
          onClick={handleToggle}
        >
          {Container}
          <Typography font={size === "medium" ? "Body2Regular" : "Body3Regular"} color="Gray900">
            {label}
            {required && " *"}
          </Typography>
        </label>
      ) : (
        <>{Container}</>
      )}
    </>
  );
};

export default Switch;
