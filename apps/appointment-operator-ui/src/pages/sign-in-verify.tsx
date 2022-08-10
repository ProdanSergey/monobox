import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

import { AuthorizationSignInVerifyBody, AuthorizationSignInVerifyResponseData } from "@monobox/appointment-contract";
import {
  AppointmentNetworkClientError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  StyledSpacer,
  useDataHandler,
} from "@monobox/appointment-library";
import { LocalStorage } from "@monobox/toolkit";

import { AuthorizationStore, LocalStore } from "../types/local-store";
import { signInVerifyOperator } from "../shared/api/authorization";
import { SignInVerifyForm } from "../templates/authorization/form/sign-in-verify-form";

const ls = new LocalStorage<AuthorizationStore>(LocalStore.AUTHORIZATION);

export const SignInVerifyPage: FunctionComponent = () => {
  const { data, error, dataHandler } = useDataHandler<
    AuthorizationSignInVerifyResponseData,
    AppointmentNetworkClientError,
    AuthorizationSignInVerifyBody
  >(async ({ email, otp }) => {
    const response = await signInVerifyOperator({ email, otp });

    ls.set({ accessToken: response.accessToken });

    return response;
  });

  return (
    <StyledContainer>
      <StyledSection>
        <SignInVerifyForm onSubmit={({ email, otp }) => dataHandler({ email, otp })} />
      </StyledSection>

      {data && <Navigate to={"/"} />}

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
