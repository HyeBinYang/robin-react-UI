import React from "react";
import { css, keyframes } from "@emotion/react";
import { MdOutlineDarkMode } from "react-icons/md";
import { GoSun } from "react-icons/go";

type Props = {
  isDark?: boolean;
  onToggle?: () => void;
};

const DarkModeSwitch = ({ isDark, onToggle }: Props) => {
  const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
      animation-timing-function: ease-in;
    }
    50% {
      transform: translateY(-10px);
      animation-timing-function: ease-out;
    }
  `;

  return (
    <div className="darkThemeBtn">
      <input
        id="darkmode-toggle"
        type="checkbox"
        css={css`
          display: none;
        `}
      />
      <label
        htmlFor="darkmode-toggle"
        css={css`
          background-color: ${isDark ? "#fff9c4	" : "#312e81"};
          border-radius: 10px;
          height: 48px;
          width: 48px;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          cursor: pointer;
          box-shadow: ${isDark
            ? "0 0 8px rgba(250, 234, 120, 0.5), 0 0 16px rgba(250, 234, 120, 0.4),0 0 24px rgba(250, 234, 120, 0.3)"
            : "none"};
          transition: background-color 0.2s linear;
          animation: ${bounce} 1s infinite;

          &:hover {
            background-color: ${isDark ? "#fff59d" : ""};
            box-shadow: ${isDark
              ? "0 0 12px rgba(250, 234, 120, 0.7), 0 0 24px rgba(250, 234, 120, 0.5),0 0 36px rgba(250, 234, 120, 0.4);"
              : "none"};
          }

          & svg {
            position: absolute;
            transition: opacity, transform 0.2s linear;
          }
        `}
        onClick={onToggle}
      >
        <GoSun
          size={28}
          color="#5d5000"
          css={css`
            opacity: ${isDark ? 1 : 0};
            transform: rotate(${isDark ? "0deg" : "-360deg"});
          `}
        />
        <MdOutlineDarkMode
          size={28}
          color="#e0e7ff"
          css={css`
            opacity: ${isDark ? 0 : 1};
            transform: rotate(${isDark ? "-360deg" : "0deg"});
          `}
        />
      </label>
    </div>
  );
};

export default DarkModeSwitch;
