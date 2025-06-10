import { css } from "@emotion/react";
import React, { FormEvent, useRef, useState } from "react";
import { useDynamicForm } from "../../hooks/dynamic-form";
import { v6 as uuidv6 } from "uuid";

type Props = {
  onClose?: () => void;
};

const AddFieldModal = ({ onClose }: Props) => {
  const { addFormField } = useDynamicForm();
  const labelRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!labelRef.current || !nameRef.current || !typeRef.current) return;

    addFormField({
      id: uuidv6(),
      label: labelRef.current.value,
      type: typeRef.current.value,
      name: nameRef.current.value,
    });

    onClose?.();
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.05);
      `}
      onClick={onClose}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 360px;
          padding: 24px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.068);
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          css={css`
            display: flex;
            flex-direction: column;
            gap: 32px;
          `}
          onSubmit={handleSubmit}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
          >
            <label htmlFor="title">Label</label>
            <input ref={labelRef} />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
          >
            <label htmlFor="name">Name</label>
            <input ref={nameRef} />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
          >
            <label htmlFor="type">Type</label>
            <select ref={typeRef} defaultValue="text">
              <option value="text" label="text" />
              <option value="email" label="email" />
              <option value="password" label="password" />
              <option value="textarea" label="textarea" />
              <option value="select" label="select" />
              <option value="multiSelect" label="multi-select" />
              <option value="radio" label="radio" />
            </select>
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddFieldModal;
