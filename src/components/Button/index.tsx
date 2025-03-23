import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import style from "./Button.module.css";
import classNames from "classnames";

type Props = {
  color: "primary" | "secondary" | "tertiary";
  size: "large" | "medium" | "small";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, color, size, ...props }: PropsWithChildren<Props>) => {
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
