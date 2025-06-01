import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul,
      ol {
        list-style: none;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
      }

      img {
        max-width: 100%;
        display: block;
      }
    `}
  />
);
