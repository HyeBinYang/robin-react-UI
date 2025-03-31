import React, { PropsWithChildren } from "react";
import colors from "../../constant/color";
import styles from "./Badge.module.css";
import { DEFAULT_COLOR } from "../../constant/common";
import classNames from "classnames";

type Props = {
  badgeContent?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  overlap?: "rectangular" | "circular";
  color?: keyof typeof colors;
};

const Badge = ({
  children,
  badgeContent,
  position = "topRight",
  overlap = "rectangular",
  color = DEFAULT_COLOR,
}: PropsWithChildren<Props>) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {children}
      {badgeContent && (
        <div
          className={classNames({
            [styles["badge-content"]]: true,
            [styles["top-left"]]: position === "topLeft",
            [styles["top-right"]]: position === "topRight",
            [styles["bottom-left"]]: position === "bottomLeft",
            [styles["bottom-right"]]: position === "bottomRight",
            [styles["circular"]]: overlap === "circular",
          })}
          style={{
            backgroundColor: colors[color],
          }}
        >
          {badgeContent}
        </div>
      )}
    </div>
  );
};

export default Badge;
