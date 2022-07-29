import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

import { AuthorizationSignInVerifyBody, AuthorizationSignInVerifyResponseData } from "@monobox/appointment-contract";
import {
  ApiError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  StyledSpacer,
  useDataHandler,
} from "@monobox/appointment-library";

import { signInVerifyOperator } from "../shared/api/authorization";
import { SignInVerifyForm } from "../templates/authorization/form/sign-in-verify-form";

export const SignInVerifyPage: FunctionComponent = () => {
  const { data, error, dataHandler } = useDataHandler<
    AuthorizationSignInVerifyResponseData,
    ApiError,
    AuthorizationSignInVerifyBody
  >(({ email, otp }) => {
    return signInVerifyOperator({ email, otp });
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
