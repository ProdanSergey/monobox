import React, { FormEventHandler, useState } from "react";

type RenderProps<TValues, TErrors> = {
  values: TValues;
  errors: Partial<TErrors>;
  change: (name: string, value: unknown) => void;
  submit: FormEventHandler<HTMLFormElement>;
};

export type SubmitCallback<TValues> = (values: TValues) => void;
export type ValidateCallback<TValues, TErrors> = (values: TValues) => Partial<TErrors>;

type FormProps<TValues, TErrors> = {
  initialValues: TValues;
  children: (props: RenderProps<TValues, TErrors>) => JSX.Element;
  onSubmit?: SubmitCallback<TValues>;
  validate?: ValidateCallback<TValues, TErrors>;
};

const hasError = <TErrors extends Record<string, unknown>>(errors: TErrors): boolean => {
  return Object.keys(errors).length > 0;
};

export const Form = <TValues extends Record<string, unknown>, TErrors extends Record<string, unknown>>({
  initialValues,
  children,
  onSubmit,
  validate,
}: FormProps<TValues, TErrors>): JSX.Element => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<TErrors>>({});

  const change = (name: string, value: unknown) => {
    if (hasError(errors)) {
      setErrors({});
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const errors = validate?.(values) ?? {};

    if (hasError(errors)) {
      setErrors(errors);
      return;
    }

    onSubmit?.(values);
  };

  return <>{children({ values, errors, change, submit })}</>;
};
