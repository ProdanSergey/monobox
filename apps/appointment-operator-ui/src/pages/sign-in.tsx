import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

import { AuthorizationSignInBody } from "@monobox/appointment-contract";
import {
  AppointmentNetworkClientError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  StyledSpacer,
  useDataHandler,
} from "@monobox/appointment-frontend";

import { signInOperator } from "../shared/api/authorization";
import { SignInForm } from "../templates/authorization/form/sign-in-form";

export const SignInPage: FunctionComponent = () => {
  const { data, error, dataHandler } = useDataHandler<
    undefined,
    AppointmentNetworkClientError,
    AuthorizationSignInBody
  >(({ email }) => {
    return signInOperator({ email });
  });

  return (
    <StyledContainer>
      <StyledSection>
        <SignInForm onSubmit={({ email }) => dataHandler({ email })} />
      </StyledSection>

      {data !== null && <Navigate to={"/sign-in/verify"} />}

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
