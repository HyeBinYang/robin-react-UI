import React from "react";
import style from "./Button.module.css";
import classNames from "classnames";
import colors from "../../constant/color";

type ButtonVariant = "contained" | "outlined" | "ghost";
type ButtonColor = keyof typeof colors;
type ButtonSize = "large" | "medium" | "small";
type Props = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant, color, size, ...props }: React.PropsWithChildren<Props>) => {
  const buttonClass = classNames(
    {
      [style.contained]: variant === "contained",
      [style.outlined]: variant === "outlined",
      [style.ghost]: variant === "ghost",
      [style.large]: size === "large",
      [style.medium]: size === "medium",
      [style.small]: size === "small",
    },
    props.className
  );

  return (
    <button
      className={buttonClass}
      {...props}
      style={{
        backgroundColor: variant === "contained" ? colors[color] : undefined,
        borderColor: variant === "outlined" ? colors[color] : undefined,
        color: variant === "contained" ? undefined : colors[color],
        ...props.style,
      }}
    >
      {children}
      <span className={style["button-background"]} />
    </button>
  );
};

export default Button;
