import { css } from "@emotion/react";
import React, { PropsWithChildren } from "react";

const FormPaper = ({ children }: PropsWithChildren) => {
  return (
    <div
      css={css`
        width: 400px;
        height: 640px;
        margin: auto;
        padding: 16px 32px;
        background: white;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
      `}
    >
      {children}
    </div>
  );
};

export default FormPaper;
