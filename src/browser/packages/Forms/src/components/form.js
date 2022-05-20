import { SubmitHandler } from "../handlers/form.handler";
import { FieldHandler } from "../handlers/field.handler";

export const Former = (form, { onSubmit, onReset, validators } = {}) => {
  const formHandler = new SubmitHandler({ form, onSubmit, onReset, validators });
  const fieldHandler = new FieldHandler();

  form.addEventListener("submit", formHandler);
  form.addEventListener("input", fieldHandler);

  const validateCandidates = Array.from(form.elements).filter(({ willValidate }) => willValidate);

  for (const element of validateCandidates) {
    element.addEventListener("invalid", fieldHandler);
  }
};
