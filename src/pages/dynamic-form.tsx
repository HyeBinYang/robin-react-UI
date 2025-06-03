import React, { useRef, useState } from "react";
import { Layout } from "../components";
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";

const DynamicFormPage = () => {
  const draggedIndex = useRef<number | null>(null);
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

  const handleDrop = (index: number) => () => {
    setFields((prev) => {
      const newItems = [...prev];
      const [moved] = newItems.splice(draggedIndex.current as number, 1);
      newItems.splice(index, 0, moved);
      return newItems;
    });
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
                css={css`
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                `}
                draggable
                layout
                transition={{ duration: 0.3 }}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop(index)}
                onDragOver={(e) => e.preventDefault()}
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
