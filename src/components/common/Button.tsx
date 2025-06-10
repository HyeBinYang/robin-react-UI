import { css } from "@emotion/react";
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = {
  variant?: "contained" | "outlined";
  color?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "contained",
  color = "#03A9F4",
  children,
  ...buttonAttrs
}: PropsWithChildren<Props>) => {
  return (
    <button
      {...buttonAttrs}
      css={css`
        border-radius: 12px;
        background-color: ${variant === "contained" ? color : "transparent"};
        color: ${variant === "contained" ? "#fff" : color};
        font-size: 18px;
        font-weight: 500;
      `}
    >
      {children}
    </button>
  );
};

export default Button;
