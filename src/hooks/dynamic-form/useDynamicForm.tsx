import { useContext } from "react";
import { DynamicFormContext } from "../../components/dynamic-form/DynamicFormProvider";
import { FormField } from "types/dynamic-form";
import { TextField } from "../../components/common";

const useDynamicForm = () => {
  const context = useContext(DynamicFormContext);

  if (!context) throw new Error("DynamicFormProvider안에서 사용해주세요.");

  const { formFields, setFormFields } = context;

  const addFormField = (formField: FormField) => {
    setFormFields([...formFields, formField]);
  };

  const deleteField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const swapField = (from: number, to: number) => {
    setFormFields((prev) => {
      const newItems = [...prev];
      [newItems[from], newItems[to]] = [newItems[to], newItems[from]];
      return newItems;
    });
  };

  const renderFieldByType = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            id={field.name}
            label={field.label}
            type="text"
            placeholder={`${field.label}을 입력해주세요.`}
          />
        );
      case "email":
        return (
          <TextField
            id={field.name}
            label={field.label}
            type="email"
            placeholder="이메일을 입력해주세요."
          />
        );
      case "password":
        return (
          <TextField
            id={field.name}
            label={field.label}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        );
    }
  };

  return { formFields, addFormField, swapField, deleteField, renderFieldByType };
};

export default useDynamicForm;
