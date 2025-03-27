import React, { MouseEvent, useEffect, useRef, useState } from "react";
import style from "./Select.module.css";
import classNames from "classnames";
import Flex from "../Flex";

type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  label: string;
  size?: "large" | "medium" | "small";
  width?: number;
  helperText?: string;
  onSelect?: (option: SelectOption) => void;
};

const Select = ({ label, size = "large", width = 120, options, helperText, onSelect }: Props) => {
  const labelWrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const controlClass = classNames({
    [style["select-control"]]: true,
    [style["active"]]: open || !!selectedOption,
    [style["large"]]: size === "large",
    [style["medium"]]: size === "medium",
    [style["small"]]: size === "small",
  });

  const controlLeftClass = classNames({
    [style["select-control-left"]]: true,
  });

  const labelWrapperClass = classNames({
    [style["select-label-wrapper"]]: true,
  });

  const labelClass = classNames({
    [style["select-label"]]: true,
  });

  const controlRightClass = classNames({
    [style["select-control-right"]]: true,
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleSelect = (option: SelectOption) => (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setSelectedOption(option);
    setOpen(false);
    onSelect?.(option);
  };

  useEffect(() => {
    if (labelWrapperRef.current && labelRef.current) {
      if (!selectedOption) {
        labelWrapperRef.current.style.width = open ? `${labelRef.current.clientWidth * 0.7}px` : "";
      }
    }
  }, [open, selectedOption]);

  return (
    <div
      className={controlClass}
      tabIndex={0}
      style={{
        width,
      }}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <Flex style={{ height: "100%" }}>
        <div className={controlLeftClass} />
        <div
          className={labelWrapperClass}
          ref={labelWrapperRef}
          style={{
            maxWidth: open ? "none" : `${width - 44}px`,
          }}
        >
          {label && (
            <label className={labelClass} ref={labelRef}>
              {label}
            </label>
          )}
          {selectedOption && <span className={style["selected-value"]}>{selectedOption.label}</span>}
        </div>
        <div className={controlRightClass} />
      </Flex>
      <div className={style["select-control-dropdown-indicator"]}>
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 15l-6-6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {helperText && <p className={style["helper-text"]}>{helperText}</p>}
      {open && (
        <ul className={style["select-options"]}>
          {options.map((option) => (
            <li key={option.label} className={style["select-option"]} onClick={handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
