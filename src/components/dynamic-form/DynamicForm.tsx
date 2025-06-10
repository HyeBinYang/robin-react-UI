import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { FormEventHandler, KeyboardEvent, useRef } from "react";
import { useDynamicForm } from "../../hooks/dynamic-form";
import { GoTrash } from "react-icons/go";
import Button from "../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "types/dynamic-form";
import { TextField } from "../common";

const DynamicForm = () => {
  const { formFields, swapField, deleteField } = useDynamicForm();
  const { register, handleSubmit } = useForm();
  const draggedIndex = useRef<number | null>(null);
  const focusedIndex = useRef<number | null>(null);

  const renderFieldByType = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            {...register(field.name)}
            id={field.name}
            label={field.label}
            type="text"
            placeholder={`${field.label}을 입력해주세요.`}
          />
        );
      case "email":
        return (
          <TextField
            {...register(field.name)}
            id={field.name}
            label={field.label}
            type="email"
            placeholder="이메일을 입력해주세요."
          />
        );
      case "password":
        return (
          <TextField
            {...register(field.name)}
            id={field.name}
            label={field.label}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        );
    }
  };

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
      <AnimatePresence>
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
            {renderFieldByType(field)}
          </motion.div>
        ))}
      </AnimatePresence>
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
