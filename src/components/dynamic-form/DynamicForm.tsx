import { css } from "@emotion/react";
import React, { KeyboardEvent, useRef } from "react";
import { useDynamicForm } from "../../hooks/dynamic-form";
import { GoTrash } from "react-icons/go";
import Button from "../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import renderFieldByType from "../../utils/dynamic-form/renderFieldByType";
import { motion } from "motion/react";

const DynamicForm = () => {
  const { formFields, swapField, deleteField } = useDynamicForm();
  const { register, handleSubmit } = useForm();
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

  const onValid: SubmitHandler<Record<string, string>> = (data) => {
    console.log(data);
  };

  return (
    <form
      css={css`
        max-width: 640px;
        margin: 32px auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
      `}
      onSubmit={handleSubmit(onValid)}
    >
      {formFields.map((field, index) => (
        <motion.div
          key={field.id}
          tabIndex={0}
          css={css`
            position: relative;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            outline: none;
            border-radius: 12px;

            &:focus {
              border: 2px solid #bbdefb;
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
          <button
            type="button"
            css={css`
              position: absolute;
              top: 8px;
              right: 8px;
              border: none;
              background-color: transparent;
            `}
            onClick={() => deleteField(field.id)}
          >
            <GoTrash size={20} color="#757575" />
          </button>
          {renderFieldByType(field, register)}
        </motion.div>
      ))}
      <div
        css={css`
          position: fixed;
          bottom: 0;
          width: 640px;
          margin: 0 auto;
        `}
      >
        <Button
          css={css`
            width: 100%;
            height: 56px;
          `}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
