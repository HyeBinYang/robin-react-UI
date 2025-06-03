import React, { KeyboardEvent, useRef, useState } from "react";
import { Layout } from "../components";
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";

const DynamicFormPage = () => {
  const draggedIndex = useRef<number | null>(null);
  const focusedIndex = useRef<number | null>(null);
  const [fields, setFields] = useState([
    {
      id: "email",
      Field: (
        <>
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" />
        </>
      ),
    },
    {
      id: "name",
      Field: (
        <>
          <label htmlFor="name">이름</label>
          <input id="name" type="text" />
        </>
      ),
    },
    {
      id: "phone",
      Field: (
        <>
          <label htmlFor="phone">휴대폰번호</label>
          <input id="phone" type="tel" />
        </>
      ),
    },
  ]);

  const handleDragStart = (index: number) => {
    draggedIndex.current = index;
  };

  const handleDragEnd = () => {
    draggedIndex.current = null;
  };

  const swapField = (from: number, to: number) => {
    setFields((prev) => {
      const newItems = [...prev];
      [newItems[from], newItems[to]] = [newItems[to], newItems[from]];
      return newItems;
    });
  };

  const handleDrop = (index: number) => () => {
    swapField(draggedIndex.current as number, index);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        if (focusedIndex.current !== null && focusedIndex.current < fields.length - 1) {
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
    <Layout>
      <main>
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
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                tabIndex={0}
                css={css`
                  padding: 20px;
                  display: inline-flex;
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
                onKeyDown={handleKeydown}
              >
                {field.Field}
              </motion.div>
            ))}
          </AnimatePresence>
        </form>
        <div
          css={css`
            position: fixed;
            bottom: 20px;
            right: 20px;
          `}
        >
          <button>Add Field</button>
        </div>
      </main>
    </Layout>
  );
};

export default DynamicFormPage;
