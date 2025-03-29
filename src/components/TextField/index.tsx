import React, { InputHTMLAttributes, useId, useRef, useState } from "react";
import styles from "./TextField.module.css";
import classNames from "classnames";

type Props = {
  id?: string;
  variant?: "outlined" | "filled" | "standard";
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ id, variant = "outlined", label, ...inputProps }: Props) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [containerClass, setContainerClass] = useState({
    [styles.container]: true,
    [styles.outlined]: variant === "outlined",
    [styles.filled]: variant === "filled",
    [styles.standard]: variant === "standard",
  });

  const handleFocus = () => {
    setContainerClass({ ...containerClass, [styles.active]: true });
  };

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.value) {
      setContainerClass({ ...containerClass, [styles.active]: false });
    }
  };

  return (
    <div className={classNames(containerClass)}>
      <label className={styles.label} htmlFor={id || inputId}>
        {label}
      </label>
      <input {...inputProps} ref={inputRef} id={id || inputId} type="text" onFocus={handleFocus} onBlur={handleBlur} />
      <fieldset>
        <legend>
          <span>Outlined</span>
        </legend>
      </fieldset>
    </div>
  );
};

export default TextField;
