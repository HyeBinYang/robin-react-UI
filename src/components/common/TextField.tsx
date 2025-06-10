import { css } from "@emotion/react";
import React, { forwardRef, InputHTMLAttributes } from "react";
import Label from "./Label";

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(({ label, ...inputAttrs }, ref) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      {label && <Label id={inputAttrs.id}>{label}</Label>}
      <input
        ref={ref}
        {...inputAttrs}
        css={css`
          width: 100%;
          padding: 12px;
          border: 1px solid #bdbdbd;
          border-radius: 8px;
        `}
        autoComplete="off"
      />
    </div>
  );
});

export default TextField;
