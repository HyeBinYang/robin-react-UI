import React, { useEffect, useRef, useState } from "react";
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
  width?: number;
};

const Select = ({ label, width = 120 }: Props) => {
  const labelWrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [open, setOpen] = useState(false);

  const controlClass = classNames({
    [style["select-control"]]: true,
    [style["active"]]: open,
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

  useEffect(() => {
    if (labelWrapperRef.current && labelRef.current) {
      labelWrapperRef.current.style.width = open ? `${labelRef.current.clientWidth * 0.7}px` : "";
    }
  }, [open]);

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
      <Flex>
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
        </div>
        <div className={controlRightClass} />
      </Flex>
      <div className={style["select-control-dropdown-indicator"]}>
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {open && <div className={style["select-options"]}></div>}
    </div>
  );
};

export default Select;
