import React, { FunctionComponent } from "react";
import validator from "validator";

import { StyledAlert, Form, ValidateCallback } from "@monobox/appointment-frontend";

import { StyledForm, StyledButton, StyledField } from "./form.styled";

type UserFormValues = {
  email: string;
};

type UserFormErrors = {
  email: string;
};

export type UserFormProps = {
  onSubmit: (values: UserFormValues) => void;
};

export const SignInForm: FunctionComponent<UserFormProps> = ({ onSubmit }) => {
  const validate: ValidateCallback<UserFormValues, UserFormErrors> = ({ email }) => {
    const errors: Partial<UserFormErrors> = {};

    if (!validator.isEmail(email)) {
      errors.email = "Email is required and must have proper format";
    }

    return errors;
  };

  return (
    <Form<UserFormValues, UserFormErrors>
      initialValues={{
        email: "",
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
            <StyledButton type="submit">Get One Time Password</StyledButton>
          </StyledForm>
        );
      }}
    </Form>
  );
};
