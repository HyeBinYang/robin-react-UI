import React, { PropsWithChildren, useState } from "react";
import styles from "./Avatar.module.css";
import colors from "../../constant/color";
import classNames from "classnames";

type Props = {
  variant?: "circular" | "square" | "rounded";
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  background?: keyof typeof colors;
  textColor?: keyof typeof colors;
  className?: string;
};

const DEFAULT_SIZE = "1em";
const DEFAULT_BACKGROUND_COLOR = "Gray600";
const DEFAULT_TEXT_COLOR = "Black";

const Avatar = ({
  variant = "circular",
  children,
  src,
  alt,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  background = DEFAULT_BACKGROUND_COLOR,
  textColor = DEFAULT_TEXT_COLOR,
  className,
}: PropsWithChildren<Props>) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={classNames(
        {
          [styles["avatar-root"]]: true,
          [styles.square]: variant === "square",
          [styles.rounded]: variant === "rounded",
        },
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: !src || hasError ? colors[background] : "transparent",
        color: colors[textColor],
      }}
    >
      {src ? (
        hasError ? (
          alt ? (
            alt[0]
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#000" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#000" />
            </svg>
          )
        ) : (
          <img className={styles["avatar-image"]} src={src} alt={alt} onError={() => setHasError(true)} />
        )
      ) : (
        children
      )}
    </div>
  );
};

export default Avatar;
