import { css } from "@emotion/react";
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...buttonAttrs }: PropsWithChildren<Props>) => {
  return (
    <button {...buttonAttrs} css={css``}>
      {children}
    </button>
  );
};

export default Button;
