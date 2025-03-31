import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
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
  multiline?: boolean;
  maxRows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

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
  multiline = false,
  maxRows = 4,
  ...inputProps
}: Props) => {
  const defaultId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [containerClass, setContainerClass] = useState({});

  const resizeTextareaHeight = () => {
    if (!textareaRef.current) return;

    const INIT_INPUT_TEXTAREA_HEIGHT = 24;
    const maxHeight = INIT_INPUT_TEXTAREA_HEIGHT * maxRows;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${
      textareaRef.current.scrollHeight < maxHeight ? textareaRef.current.scrollHeight : maxHeight
    }px`;
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    resizeTextareaHeight();
    inputProps.onChange?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContainerClass({ ...containerClass, [styles.active]: true });
    inputProps.onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!inputRef.current?.value && !textareaRef.current?.value && !left) {
      setContainerClass({ ...containerClass, [styles.active]: false });
    }
    inputProps.onBlur?.(event);
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
          <label className={styles.label} htmlFor={id || defaultId}>
            {label}
            {required && "*"}
          </label>
        )}
        {multiline ? (
          <textarea
            {...inputProps}
            rows={1}
            ref={textareaRef}
            id={id || defaultId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ) : (
          <div className={styles["input-wrapper"]}>
            {left && <div className={styles.left}>{left}</div>}
            <input
              type="text"
              {...inputProps}
              ref={inputRef}
              id={id || defaultId}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {right}
          </div>
        )}
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
