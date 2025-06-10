import { css } from "@emotion/react";
import React, { PropsWithChildren } from "react";

type Props = {
  id?: string;
};

const Label = ({ children, id }: PropsWithChildren<Props>) => {
  return (
    <label
      htmlFor={id}
      css={css`
        width: fit-content;
        color: #757575;
      `}
    >
      {children}
    </label>
  );
};

export default Label;
