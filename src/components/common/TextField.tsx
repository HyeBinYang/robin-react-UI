import { css } from "@emotion/react";
import React, { forwardRef, InputHTMLAttributes } from "react";

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
      {label && (
        <label
          htmlFor={inputAttrs.id}
          css={css`
            width: fit-content;
            color: #757575;
          `}
        >
          {label}
        </label>
      )}
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
