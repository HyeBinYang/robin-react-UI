import React, { InputHTMLAttributes, useEffect, useId, useRef, useState } from "react";
import styles from "./TextField.module.css";
import classNames from "classnames";

type Props = {
  id?: string;
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  helperText?: string;
  required?: boolean;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  id,
  variant = "outlined",
  label,
  helperText,
  required = false,
  error = false,
  ...inputProps
}: Props) => {
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
      [styles.error]: error,
    });
  }, [variant, error]);

  return (
    <div>
      <div className={classNames(containerClass)}>
        <label className={styles.label} htmlFor={id || inputId}>
          {label}
          {required && "*"}
        </label>
        <input
          type="text"
          {...inputProps}
          ref={inputRef}
          id={id || inputId}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {variant === "outlined" && (
          <fieldset>
            <legend>
              <span>
                {label}
                {required && "*"}
              </span>
            </legend>
          </fieldset>
        )}
      </div>
      {helperText && <p className={styles["helper-text"]}>{helperText}</p>}
    </div>
  );
};

export default TextField;
