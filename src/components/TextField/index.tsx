import React, { InputHTMLAttributes, useEffect, useId, useRef, useState } from "react";
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
  const [containerClass, setContainerClass] = useState({});

  const handleFocus = () => {
    setContainerClass({ ...containerClass, [styles.active]: true });
  };

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.value) {
      setContainerClass({ ...containerClass, [styles.active]: false });
    }
  };

  useEffect(() => {
    setContainerClass({
      [styles.container]: true,
      [styles.outlined]: variant === "outlined",
      [styles.filled]: variant === "filled",
      [styles.standard]: variant === "standard",
    });
  }, [variant]);

  return (
    <div className={classNames(containerClass)}>
      <label className={styles.label} htmlFor={id || inputId}>
        {label}
      </label>
      <input {...inputProps} ref={inputRef} id={id || inputId} type="text" onFocus={handleFocus} onBlur={handleBlur} />
      {variant === "outlined" && (
        <fieldset>
          <legend>
            <span>{label}</span>
          </legend>
        </fieldset>
      )}
    </div>
  );
};

export default TextField;
