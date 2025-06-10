import { css } from "@emotion/react";
import React, { useState } from "react";
import { Option } from "types/global";
import Label from "./Label";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "motion/react";

type Props = {
  width?: number;
  label?: string;
  options?: Option[];
  defaultValue?: string;
  onSelect?: (value: string) => void;
};

const Select = ({ width = 160, label, options, defaultValue, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() =>
    options?.find((option) => option.value === defaultValue)
  );

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleSelect = (option: Option) => () => {
    onSelect?.(option.value);
    setOpen(false);
    setSelectedOption(option);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      {label && <Label>{label}</Label>}
      <div>
        <button
          css={css`
            width: ${width}px;
            padding: 6px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            border: 1px solid #bdbdbd;
            border-radius: 8px;
            color: #757575;
          `}
          type="button"
          aria-haspopup="menu"
          onClick={toggleMenu}
        >
          {selectedOption ? selectedOption.label : "Select menu..."}
          <motion.span
            css={css`
              height: 24px;
            `}
            animate={{
              rotate: open ? 180 : 0,
            }}
          >
            <MdKeyboardArrowDown size={24} />
          </motion.span>
        </button>
        {options && open && (
          <ul
            css={css`
              margin-top: 2px;
              border: 1px solid #bdbdbd;
              border-radius: 8px;
              color: #424242;
            `}
            role="menu"
          >
            {options.map((option) => (
              <li
                css={css`
                  padding: 8px;
                  cursor: pointer;

                  &:hover {
                    background-color: #eeeeee;
                  }
                `}
                key={option.value}
                role="menuitem"
                onClick={handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
