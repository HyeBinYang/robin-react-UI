import { useContext } from "react";
import { DynamicFormContext } from "../../components/dynamic-form/DynamicFormProvider";
import { FormField } from "types/dynamic-form";

const useDynamicForm = () => {
  const context = useContext(DynamicFormContext);

  if (!context) throw new Error("DynamicFormProvider안에서 사용해주세요.");

  const { formFields, setFormFields } = context;

  const addFormField = (formField: FormField) => {
    setFormFields([...formFields, formField]);
  };

  const swapField = (from: number, to: number) => {
    setFormFields((prev) => {
      const newItems = [...prev];
      [newItems[from], newItems[to]] = [newItems[to], newItems[from]];
      return newItems;
    });
  };

  return { formFields, addFormField, swapField };
};

export default useDynamicForm;
