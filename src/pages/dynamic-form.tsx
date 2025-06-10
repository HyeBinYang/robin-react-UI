import React, { useState } from "react";
import { Layout } from "../components";
import { css } from "@emotion/react";
import AddFieldModal from "../components/dynamic-form/AddFieldModal";
import { DynamicFormProvider } from "../components/dynamic-form";
import DynamicForm from "../components/dynamic-form/DynamicForm";

const DynamicFormPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <Layout>
      <main>
        <DynamicFormProvider>
          <DynamicForm />
          {openAddModal && <AddFieldModal onClose={() => setOpenAddModal(false)} />}
        </DynamicFormProvider>
        <div
          css={css`
            position: fixed;
            bottom: 20px;
            right: 20px;
          `}
        >
          <button type="button" onClick={() => setOpenAddModal(true)}>
            Add Field
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default DynamicFormPage;
