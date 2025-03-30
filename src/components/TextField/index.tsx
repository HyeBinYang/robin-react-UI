import React, { InputHTMLAttributes, ReactNode, useEffect, useId, useRef, useState } from "react";
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
  left?: ReactNode;
  right?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const TextField = ({
  id,
  variant = "outlined",
  size = "normal",
  label,
  helperText,
  required = false,
  error = false,
  left,
  right,
  ...inputProps
}: Props) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [containerClass, setContainerClass] = useState({});

  const handleFocus = () => {
    setContainerClass({ ...containerClass, [styles.active]: true });
  };

  const handleBlur = () => {
    if (!inputRef.current?.value && !left) {
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
      [styles.active]: !!left,
    });
  }, [label, variant, size, error, left]);

  return (
    <div>
      <div className={classNames(containerClass)}>
        {label && (
          <label className={styles.label} htmlFor={id || inputId}>
            {label}
            {required && "*"}
          </label>
        )}
        <div className={styles["input-wrapper"]}>
          {left && <div className={styles.left}>{left}</div>}
          <input
            type="text"
            {...inputProps}
            ref={inputRef}
            id={id || inputId}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {right}
        </div>
        {variant === "outlined" && (
          <fieldset>
            <legend>
              <span>
                {label}
                {label && required && "*"}
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
