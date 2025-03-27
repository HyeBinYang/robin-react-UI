import React, { CSSProperties } from "react";
import typography from "../../constant/typography";
import { PropsWithChildren } from "react";
import colors from "../../constant/color";
import classNames from "classnames";
import style from "./Typography.module.css";

type TypographyElements =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "b"
  | "strong"
  | "i"
  | "em"
  | "small"
  | "span";
type Props = {
  font: keyof typeof typography;
  color?: keyof typeof colors;
  as?: TypographyElements;
  style?: CSSProperties;
  className?: string;
};
const Typography = ({ font, color = "Black", as: Tag = "p", children, ...props }: PropsWithChildren<Props>) => {
  const typographyClass = classNames(
    {
      [style["heading1-pc"]]: font === "Heading1Pc",
      [style["heading1-mobile"]]: font === "Heading1Mobile",
      [style["heading2-pc"]]: font === "Heading2Pc",
      [style["heading2-mobile"]]: font === "Heading2Mobile",
      [style["heading3-pc"]]: font === "Heading3Pc",
      [style["heading3-mobile"]]: font === "Heading3Mobile",
      [style["heading4-pc"]]: font === "Heading4Pc",
      [style["heading4-mobile"]]: font === "Heading4Mobile",
      [style["subtitle1"]]: font === "Subtitle1",
      [style["subtitle2"]]: font === "Subtitle2",
      [style["subtitle3"]]: font === "Subtitle3",
      [style["body1-regular"]]: font === "Body1Regular",
      [style["body1-medium"]]: font === "Body1Medium",
      [style["body2-regular"]]: font === "Body2Regular",
      [style["body2-medium"]]: font === "Body2Medium",
      [style["body3-regular"]]: font === "Body3Regular",
      [style["body3-medium"]]: font === "Body3Medium",
      [style["body4-regular"]]: font === "Body4Regular",
      [style["body4-medium"]]: font === "Body4Medium",
      [style["detail1"]]: font === "Detail1",
      [style["detail2"]]: font === "Detail2",
    },
    props.className
  );

  return (
    <Tag
      className={typographyClass}
      style={{
        color: colors[color],
      }}
    >
      {children}
    </Tag>
  );
};

export default Typography;
