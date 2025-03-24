import React from "react";
import style from "./Button.module.css";
import classNames from "classnames";

type ButtonColor = "primary" | "secondary" | "tertiary";
type ButtonSize = "large" | "medium" | "small";
type Props = {
  color: ButtonColor;
  size: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, color, size, ...props }: React.PropsWithChildren<Props>) => {
  const buttonClass = classNames(
    {
      [style.primary]: color === "primary",
      [style.secondary]: color === "secondary",
      [style.tertiary]: color === "tertiary",
      [style.large]: size === "large",
      [style.medium]: size === "medium",
      [style.small]: size === "small",
    },
    props.className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
      <span className={style["button-background"]} />
    </button>
  );
};

export default Button;
