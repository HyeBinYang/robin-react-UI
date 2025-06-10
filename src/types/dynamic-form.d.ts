declare module "types/dynamic-form" {
  type FormFieldType = "text" | "email" | "password" | "onlyNumber";

  type FormField = {
    id: string;
    label: string;
    type: FormFieldType;
    name: string;
  };
}
