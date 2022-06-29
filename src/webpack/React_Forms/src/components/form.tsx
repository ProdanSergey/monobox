import { ReactNode, useState, ReactEventHandler } from "react";

const hasError = <FormValues extends Values>(errors: Errors<FormValues>): boolean => {
  return Object.keys(errors).length > 0;
};

type Values = Record<string, unknown>;
type Errors<Values> = Partial<Record<keyof Values, string>>;

type RenderProps<FormValues> = {
  values: FormValues;
  errors: Errors<FormValues>;
  change: (state: Partial<FormValues>) => void;
  submit: ReactEventHandler<HTMLFormElement>;
};

export type FormValidate<FormValues> = (values: FormValues) => Errors<FormValues>;
export type FormSubmit<FormValues> = (values: FormValues) => void;

export type FormProps<FormValues> = {
  initialValues: FormValues;
  validate?: FormValidate<FormValues>;
  onSubmit?: FormSubmit<FormValues>;
  children: (props: RenderProps<FormValues>) => ReactNode;
};

export const Form = <FormValues extends Values>({
  initialValues,
  validate,
  children,
  onSubmit,
}: FormProps<FormValues>): JSX.Element => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors<FormValues>>({});

  const change = (state: Partial<FormValues>) => {
    if (hasError(errors)) {
      setErrors({});
      return;
    }

    setValues((values) => ({ ...values, ...state }));
  };

  const submit: ReactEventHandler<HTMLFormElement> = (event) => {
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
