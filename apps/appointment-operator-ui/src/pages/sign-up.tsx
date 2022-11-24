import React, { FunctionComponent } from "react";

import { AuthorizationSignUpBody } from "@monobox/appointment-contract";
import {
  AppointmentNetworkClientError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  StyledSpacer,
  useDataHandler,
} from "@monobox/appointment-frontend";

import { signUpOperator } from "../shared/api/authorization";
import { SignUpForm } from "../templates/authorization/form/sign-up-form";
import { Link } from "react-router-dom";

export const SignUpPage: FunctionComponent = () => {
  const { data, error, dataHandler } = useDataHandler<
    undefined,
    AppointmentNetworkClientError,
    AuthorizationSignUpBody
  >(({ fullName, email }) => {
    return signUpOperator({ fullName, email });
  });

  return (
    <StyledContainer>
      <StyledSection>
        <SignUpForm onSubmit={({ fullName, email }) => dataHandler({ fullName, email })} />
      </StyledSection>

      {data !== null && (
        <StyledSection>
          <StyledAlert type="info" size="m">
            You have successfully signed up. Now you could proceed to <Link to="/sign-in">Login page</Link> to sign-in
            into your account.
          </StyledAlert>
        </StyledSection>
      )}

      {error && (
        <>
          <StyledSpacer size="m" />
          <StyledSection>
            <StyledAlert size="m">{error.message}</StyledAlert>
          </StyledSection>
        </>
      )}
    </StyledContainer>
  );
};
