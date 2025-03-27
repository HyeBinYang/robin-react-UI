import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import style from "./Flex.module.css";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "baseline"
  | "normal";
type FlexAlignItems = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
type FlexAlignContent =
  | "normal"
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "baseline";

type Props = {
  inline?: boolean;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: FlexAlignItems;
  alignContent?: FlexAlignContent;
  gap?: number | number[];
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const Flex = ({ children, ...props }: Props) => {
  const [gap, setGap] = useState(0);

  useEffect(() => {
    const updateGap = () => {
      if (!props.gap) {
        setGap(0);
        return;
      }

      if (!Array.isArray(props.gap)) {
        setGap(props.gap);
        return;
      }

      if (window.innerWidth < 480 && !!props.gap[2]) {
        setGap(props.gap[2]);
      } else if (window.innerWidth < 768 && !!props.gap[1]) {
        setGap(props.gap[1]);
      } else {
        setGap(props.gap[0]);
      }
    };

    updateGap();
    window.addEventListener("resize", updateGap);

    return () => window.removeEventListener("resize", updateGap);
  }, [props.gap]);

  const flexClass = classNames({
    [style.flex]: true,
    [style.inline]: props.inline === true,
    [style.nowrap]: props.flexWrap === "nowrap",
    [style.wrap]: props.flexWrap === "wrap",
    [style["wrap-reverse"]]: props.flexWrap === "wrap-reverse",
    [style.row]: !props.flexDirection || props.flexDirection === "row",
    [style["row-reverse"]]: props.flexDirection === "row-reverse",
    [style.column]: props.flexDirection === "column",
    [style["column-reverse"]]: props.flexDirection === "column-reverse",
    [style["items-start"]]: props.alignItems === "flex-start",
    [style["items-end"]]: props.alignItems === "flex-end",
    [style["items-center"]]: props.alignItems === "center",
    [style["items-baseline"]]: props.alignItems === "baseline",
    [style["items-stretch"]]: props.alignItems === "stretch",
    [style["content-normal"]]: props.alignContent === "normal",
    [style["content-center"]]: props.alignContent === "center",
    [style["content-start"]]: props.alignContent === "flex-start",
    [style["content-end"]]: props.alignContent === "flex-end",
    [style["content-between"]]: props.alignContent === "space-between",
    [style["content-around"]]: props.alignContent === "space-around",
    [style["content-evenly"]]: props.alignContent === "space-evenly",
    [style["content-baseline"]]: props.alignContent === "baseline",
    [style["content-stretch"]]: props.alignContent === "stretch",
    [style["justify-start"]]: props.justifyContent === "flex-start",
    [style["justify-end"]]: props.justifyContent === "flex-end",
    [style["justify-center"]]: props.justifyContent === "center",
    [style["justify-between"]]: props.justifyContent === "space-between",
    [style["justify-around"]]: props.justifyContent === "space-around",
    [style["justify-evenly"]]: props.justifyContent === "space-evenly",
    [style["justify-stretch"]]: props.justifyContent === "stretch",
    [style["justify-baseline"]]: props.justifyContent === "baseline",
    [style["justify-normal"]]: props.justifyContent === "normal",
  });

  return (
    <div
      className={flexClass}
      style={{
        gap,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
