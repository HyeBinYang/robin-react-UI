import { DefaultColor, DefaultOrientation } from "@/types/common";
import React, { PropsWithChildren } from "react";
import styles from "./Divider.module.css";
import colors from "../../constant/color";
import classNames from "classnames";

type Props = {
  orientation?: DefaultOrientation;
  color?: DefaultColor;
  className?: string;
  style?: React.CSSProperties;
};

const Divider = ({
  children,
  orientation = "horizontal",
  color = "Gray400",
  className,
  style,
}: PropsWithChildren<Props>) => {
  return (
    <hr
      className={classNames(
        {
          [styles["divider-root"]]: true,
          [styles.vertical]: orientation === "vertical",
        },
        className
      )}
      style={{
        borderColor: colors[color],
        ...style,
      }}
    >
      {children}
    </hr>
  );
};

export default Divider;
