import { ChangeEvent } from "react";

export default function handleOnlyNumberChange(event: ChangeEvent<HTMLInputElement>) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
}
