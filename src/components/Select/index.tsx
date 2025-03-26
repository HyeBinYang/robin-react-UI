import React, { useState } from "react";
import style from "./Select.module.css";
import classNames from "classnames";
import Flex from "../Flex";

type SelectOption = {
  label?: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  label: string;
};

const Select = ({ label }: Props) => {
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

  return (
    <div className={controlClass} tabIndex={0} onClick={() => setOpen(true)} onBlur={() => setOpen(false)}>
      <Flex>
        <div className={controlLeftClass} />
        <div className={labelWrapperClass}>{label && <label className={labelClass}>{label}</label>}</div>
        <div className={controlRightClass} />
      </Flex>
      <div className={style["select-control-dropdown-indicator"]}>
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        )}
      </div>
      {open && <div className={style["select-options"]}></div>}
    </div>
  );
};

export default Select;
