import React, { FunctionComponent } from "react";
import validator from "validator";
import { Form, ValidateCallback } from "../../../components/form";
import { StyledAlert } from "../../../shared/elements/alert.styled";
import { StyledForm, StyledButton, StyledField } from "./form.styled";

type AppointmentFormValues = {
  fullName: string;
  email: string;
};

type AppointmentFormErrors = {
  fullName: string;
  email: string;
};

export type AppointmentFormProps = {
  isLoading: boolean;
  onSubmit: (values: AppointmentFormValues) => void;
};

export const AppointmentForm: FunctionComponent<AppointmentFormProps> = ({ isLoading, onSubmit }) => {
  const validate: ValidateCallback<AppointmentFormValues, AppointmentFormErrors> = ({ fullName, email }) => {
    const errors: Partial<AppointmentFormErrors> = {};

    if (fullName.length < 1) {
      errors.fullName = "Full Name is required";
    }

    if (!validator.isEmail(email)) {
      errors.email = "Email is required and must have proper format";
    }

    return errors;
  };

  return (
    <Form<AppointmentFormValues, AppointmentFormErrors>
      initialValues={{
        fullName: "",
        email: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, change, submit }) => {
        return (
          <StyledForm noValidate onSubmit={submit}>
            <StyledField>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={values.fullName}
                onChange={({ target: { name, value } }) => {
                  change(name, value);
                }}
              />
              {errors.fullName && <StyledAlert size="s">{errors.fullName}</StyledAlert>}
            </StyledField>
            <StyledField>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={({ target: { name, value } }) => {
                  change(name, value);
                }}
              />
              {errors.email && <StyledAlert size="s">{errors.email}</StyledAlert>}
            </StyledField>
            <StyledButton type="submit" disabled={isLoading}>
              Get Appointment
            </StyledButton>
          </StyledForm>
        );
      }}
    </Form>
  );
};
