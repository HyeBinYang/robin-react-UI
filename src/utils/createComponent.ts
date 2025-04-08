import React from "react";
import { DefaultColor } from "../types";
import * as CSS from "csstype";
import cssProperties from "@/constants/cssProperties";
import camelToKebab from "@/utils/camelToKebab";
import colors from "@/constants/color";
import injectStyle from "./injectStyle";
import generateClassName from "./generateClassName";

type BasicStyleProps = CSS.StandardProperties & {
  color?: DefaultColor;
  backgroundColor?: DefaultColor;
  borderColor?: DefaultColor;
};
type BasicProps = BasicStyleProps & {
  as?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function createComponent<TProps = {}, TTag extends React.ElementType = "div">(
  type: TTag
): React.FC<BasicProps & TProps> {
  return function Component(props: BasicProps & TProps) {
    const className = generateClassName();
    const basicProps = { ...props, className };
    const stylePropsEntries = Object.entries(props).filter(([key]) => cssProperties.has(key));
    const css = stylePropsEntries.reduce((cssRules: string, [key, value]) => {
      if (!value) return cssRules;

      delete basicProps[key as keyof typeof basicProps];

      if (key.toLocaleLowerCase().includes("color")) {
        return cssRules + `${camelToKebab(key)}: ${colors[value as keyof typeof colors]};\n`;
      } else {
        return cssRules + `${camelToKebab(key)}: ${value};\n`;
      }
    }, "");

    injectStyle(className, css);

    return React.createElement(props?.as ?? type, { ...basicProps });
  };
}
