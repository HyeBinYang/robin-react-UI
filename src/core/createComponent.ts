import React from "react";
import { DefaultColor } from "../types";
import * as CSS from "csstype";

type BasicStyleProps = CSS.Properties & {
  color?: DefaultColor;
  backgroundColor?: DefaultColor;
};
type BasicProps<T extends React.ElementType> = React.ComponentProps<T> & BasicStyleProps;

function generateRandomClassName(prefix = "box") {
  return `${prefix}-${Math.random().toString(36).substr(2, 6)}`;
}

function injectCSSRule(className: string, cssRules: string) {
  const style = document.createElement("style");
  style.innerHTML = `.${className} { ${cssRules} }`;
  document.head.appendChild(style);
}

function isCSSProperty(prop: string): prop is keyof CSS.Properties {
  return prop in ({} as CSS.Properties);
}

export default function createComponent<T extends React.ElementType>(
  type: T
): React.FC<BasicProps<T>> {
  return function Component(props: BasicProps<T>) {
    const basicProps = { ...props };
    const randomClass = generateRandomClassName();

    return React.createElement(type, basicProps);
  };
}
