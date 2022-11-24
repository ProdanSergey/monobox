import React, { FunctionComponent } from "react";
import validator from "validator";

import { StyledAlert, Form, ValidateCallback } from "@monobox/appointment-frontend";

import { StyledForm, StyledButton, StyledField } from "./form.styled";

type UserFormValues = {
  email: string;
  otp: string;
};

type UserFormErrors = {
  email: string;
  otp: string;
};

export type UserFormProps = {
  onSubmit: (values: UserFormValues) => void;
};

export const SignInVerifyForm: FunctionComponent<UserFormProps> = ({ onSubmit }) => {
  const validate: ValidateCallback<UserFormValues, UserFormErrors> = ({ email, otp }) => {
    const errors: Partial<UserFormErrors> = {};

    if (!validator.isEmail(email)) {
      errors.email = "Email is required and must have proper format";
    }

    if (!otp || otp.length !== 6) {
      errors.email = "Otp must be provided and must be 6 ch long";
    }

    return errors;
  };

  return (
    <Form<UserFormValues, UserFormErrors>
      initialValues={{
        email: "",
        otp: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, change, submit }) => {
        return (
          <StyledForm noValidate onSubmit={submit}>
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
            <StyledField>
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={values.otp}
                onChange={({ target: { name, value } }) => {
                  change(name, value);
                }}
              />
              {errors.email && <StyledAlert size="s">{errors.email}</StyledAlert>}
            </StyledField>
            <StyledButton type="submit">Sign In</StyledButton>
          </StyledForm>
        );
      }}
    </Form>
  );
};
