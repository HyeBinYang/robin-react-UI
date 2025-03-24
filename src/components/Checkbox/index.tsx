import React from "react";
import style from "./Checkbox.module.css";

type Props = {
  htmlFor: string;
  label?: string;
  checked?: boolean;
  onChange?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ htmlFor, label, checked, onChange, ...props }: Props) => {
  return (
    <label htmlFor={htmlFor}>
      <input className={style["checkbox-input"]} id={htmlFor} type="checkbox" checked={checked} onChange={onChange} {...props} />
      <span className={style["checkbox-label"]}>{label}</span>
    </label>
  );
};

export default Checkbox;
