import React, { InputHTMLAttributes, useEffect, useId, useRef, useState } from "react";
import styles from "./TextField.module.css";
import classNames from "classnames";

type Props = {
  id?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "normal" | "small";
  label?: string;
  helperText?: string;
  required?: boolean;
  error?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const TextField = ({
  id,
  variant = "outlined",
  size = "normal",
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
    if (label) {
      setContainerClass({ ...containerClass, [styles.active]: true });
    }
  };

  const handleBlur = () => {
    if (inputRef.current && !inputRef.current.value) {
      setContainerClass({ ...containerClass, [styles.active]: false });
    }
  };

  useEffect(() => {
    setContainerClass({
      [styles.container]: true,
      [styles["with-label"]]: !!label,
      [styles.outlined]: variant === "outlined",
      [styles.filled]: variant === "filled",
      [styles.standard]: variant === "standard",
      [styles.normal]: size === "normal",
      [styles.small]: size === "small",
      [styles.error]: error,
    });
  }, [label, variant, size, error]);

  return (
    <div>
      <div className={classNames(containerClass)}>
        {label && (
          <label className={styles.label} htmlFor={id || inputId}>
            {label}
            {required && "*"}
          </label>
        )}
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
