import { FormField } from "types/dynamic-form";
import { TextField } from "../../components/common";
import { UseFormRegister } from "react-hook-form";
import handleOnlyNumberChange from "../handleOnlyNumberChange";

export default function renderFieldByType(field: FormField, register: UseFormRegister<any>) {
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
    case "onlyNumber":
      return (
        <TextField
          {...register(field.name, {
            onChange: handleOnlyNumberChange,
          })}
          id={field.name}
          label={field.label}
          type="tel"
          placeholder={`${field.label}을 입력해주세요.`}
        />
      );
  }
}
