import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { KeyboardEvent, useRef } from "react";
import { useDynamicForm } from "../../hooks/dynamic-form";

const DynamicForm = () => {
  const { formFields, swapField } = useDynamicForm();
  const draggedIndex = useRef<number | null>(null);
  const focusedIndex = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    draggedIndex.current = index;
    focusedIndex.current = index;
  };

  const handleDragEnd = () => {
    draggedIndex.current = null;
  };

  const handleDrop = (index: number) => () => {
    swapField(draggedIndex.current as number, index);
    focusedIndex.current = index;
  };

  const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        if (focusedIndex.current !== null && focusedIndex.current < formFields.length - 1) {
          swapField(focusedIndex.current, focusedIndex.current + 1);
          focusedIndex.current++;
        }
        break;
      case "ArrowUp":
        if (focusedIndex.current !== null && focusedIndex.current > 0) {
          swapField(focusedIndex.current, focusedIndex.current - 1);
          focusedIndex.current--;
        }
        break;
    }
  };

  return (
    <form
      css={css`
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
      `}
    >
      <AnimatePresence>
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            tabIndex={0}
            css={css`
              padding: 20px;
              display: flex;
              flex-direction: column;
              gap: 4px;
              outline: none;

              &:focus {
                border: 1px solid black;
              }

              & > label {
                align-self: flex-start;
              }
            `}
            draggable
            layout
            transition={{ duration: 0.3 }}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop(index)}
            onDragOver={(e) => e.preventDefault()}
            onFocus={() => (focusedIndex.current = index)}
            onBlur={() => (focusedIndex.current = null)}
            onKeyDown={handleKeydown}
          >
            <label>{field.label}</label>
            {field.type === "input" && <input />}
          </motion.div>
        ))}
      </AnimatePresence>
    </form>
  );
};

export default DynamicForm;
