import { css } from "@emotion/react";
import React, { FormEvent, useRef, useState } from "react";
import { useDynamicForm } from "../../hooks/dynamic-form";
import { v6 as uuidv6 } from "uuid";
import { Select, TextField } from "../common";
import { FormFieldType } from "types/dynamic-form";

type Props = {
  onClose?: () => void;
};

const AddFieldModal = ({ onClose }: Props) => {
  const { addFormField } = useDynamicForm();
  const labelRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<FormFieldType>("text");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!labelRef.current || !nameRef.current) return;

    addFormField({
      id: uuidv6(),
      label: labelRef.current.value,
      type,
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
          <TextField label="Label" ref={labelRef} placeholder="Type Label..." />
          <TextField label="Name" ref={nameRef} placeholder="Type Name..." />
          <Select
            label="Type"
            defaultValue="text"
            options={[
              { label: "Text", value: "text" },
              { label: "Email", value: "email" },
              { label: "Password", value: "password" },
              { label: "Only Number", value: "onlyNumber" },
            ]}
            onSelect={(value) => setType(value as FormFieldType)}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddFieldModal;
