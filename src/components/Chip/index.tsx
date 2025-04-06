import React from "react";
import colors from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";
import styles from "./Chip.module.css";
import classNames from "classnames";
import hexToRgb from "../../utils/hexToRgb";

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

type Props = {
  label?: string;
  variant?: "filled" | "outlined";
  size?: "medium" | "small";
  backgroundColor?: keyof typeof colors;
  labelColor?: keyof typeof colors;
  deleteIcon?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
};

const DefaultDeleteIcon = ({
  variant,
  backgroundColor,
  onDelete,
}: {
  variant: "filled" | "outlined";
  backgroundColor: keyof typeof colors;
  onDelete: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <svg
      className={classNames({
        [styles["chip-delete-icon"]]: true,
      })}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill:
          variant === "filled"
            ? (hexToRgb(colors["White"], 0.225) as string)
            : (hexToRgb(colors[backgroundColor], 0.225) as string),
      }}
      onClick={handleClick}
    >
      <circle cx="12" cy="12" r="12" />
      <path
        d="M15 9L9 15"
        stroke={variant === "filled" ? colors["White"] : colors[backgroundColor]}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 9L15 15"
        stroke={variant === "filled" ? colors["White"] : colors[backgroundColor]}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Chip = ({
  label,
  variant = "filled",
  size = "medium",
  backgroundColor = DEFAULT_COLOR,
  labelColor = "White",
  deleteIcon,
  icon,
  onClick,
  onDelete,
}: Props) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <span
      className={classNames({
        [styles["chip-root"]]: true,
        [styles.outlined]: variant === "outlined",
        [styles.small]: size === "small",
        [styles.clickable]: !!onClick,
      })}
      style={{
        border: variant === "outlined" ? `1px solid ${colors[backgroundColor]}` : "none",
        backgroundColor: variant === "filled" ? colors[backgroundColor] : "transparent",
        color: variant === "filled" ? colors[labelColor] : colors[backgroundColor],
      }}
      onClick={onClick}
    >
      <span
        className={classNames({
          [styles["chip-background"]]: true,
        })}
      ></span>
      {React.isValidElement(icon) &&
        React.cloneElement(icon as React.ReactElement<IconProps>, {
          className: styles["chip-icon"],
          style: {
            color: variant === "filled" ? colors["White"] : colors[backgroundColor],
          },
          width: icon.type === "svg" ? "1em" : undefined,
          height: icon.type === "svg" ? "1em" : undefined,
        })}
      <span className={styles["chip-label"]}>{label}</span>
      {!!onDelete &&
        (React.isValidElement(deleteIcon) ? (
          React.cloneElement(deleteIcon as React.ReactElement<IconProps>, {
            className: styles["chip-delete-icon"],
            style: {
              color: variant === "filled" ? colors["White"] : colors[backgroundColor],
            },
            width: "1em",
            height: "1em",
            onClick: handleDeleteClick,
          })
        ) : (
          <DefaultDeleteIcon variant={variant} backgroundColor={backgroundColor} onDelete={onDelete} />
        ))}
    </span>
  );
};

export default Chip;
