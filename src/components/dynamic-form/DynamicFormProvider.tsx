import React, { createContext, Dispatch, PropsWithChildren, useState } from "react";
import { FormField } from "types/dynamic-form";

type DynamicFormState = {
  formFields: FormField[];
  setFormFields: Dispatch<React.SetStateAction<FormField[]>>;
};

export const DynamicFormContext = createContext<DynamicFormState | null>(null);

const DynamicFormProvider = ({ children }: PropsWithChildren) => {
  const [formFields, setFormFields] = useState<FormField[]>([]);

  return (
    <DynamicFormContext.Provider value={{ formFields, setFormFields }}>
      {children}
    </DynamicFormContext.Provider>
  );
};

export default DynamicFormProvider;
