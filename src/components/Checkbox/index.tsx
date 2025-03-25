import React from "react";
import style from "./Checkbox.module.css";

type Props = {
  htmlFor: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ htmlFor, label, checked, onChange, ...props }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label htmlFor={htmlFor}>
      <input className={style["checkbox-input"]} {...props} id={htmlFor} type="checkbox" checked={checked} onChange={handleChange} />
      <span className={style["checkbox-label"]}>{label}</span>
    </label>
  );
};

export default Checkbox;
