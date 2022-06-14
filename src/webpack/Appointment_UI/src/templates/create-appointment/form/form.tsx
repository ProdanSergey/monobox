import React, { ChangeEventHandler, FormEventHandler } from "react";
import { FunctionComponent } from "react";
import { StyledForm, StyledButton, StyledInputError, StyledInputField, StyledInputLabel } from "./form.styled";

export type CreateAppointmentFormValues = {
  fullName: string;
  email: string;
};

export type CreateAppointmentFormErrors = {
  fullName?: string;
  email?: string;
};

export type CreateAppointmentFormProps = {
  errors?: CreateAppointmentFormErrors;
  onChange: (name: keyof CreateAppointmentFormValues, value: string) => void;
  onSubmit: () => void;
};

export const CreateAppointmentForm: FunctionComponent<CreateAppointmentFormProps> = ({
  errors,
  onChange,
  onSubmit,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    onChange(name as keyof CreateAppointmentFormValues, value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <StyledInputLabel htmlFor="fullName">Full Name</StyledInputLabel>
      <StyledInputField type="text" name="fullName" id="fullName" onChange={handleChange} />
      {errors?.fullName && <StyledInputError>{errors.fullName}</StyledInputError>}
      <StyledInputLabel htmlFor="email">Email address</StyledInputLabel>
      <StyledInputField type="email" name="email" id="email" onChange={handleChange} />
      {errors?.email && <StyledInputError>{errors.email}</StyledInputError>}
      <StyledButton type="submit">Get Appointment</StyledButton>
    </StyledForm>
  );
};
