import {
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
  AuthorizationSignUpBody,
} from "@monobox/appointment-contract";

import { authNetworkClient } from "./client";

const RESOURCE = "authorization";

export const signUpOperator = async ({ fullName, email }: AuthorizationSignUpBody) => {
  return authNetworkClient.post<undefined>(`${RESOURCE}/sign-up`, {
    body: { fullName, email },
  });
};

export const signInOperator = async ({ email }: AuthorizationSignInBody) => {
  return authNetworkClient.post<undefined>(`${RESOURCE}/sign-in`, {
    body: { email },
  });
};

export const signInVerifyOperator = async ({ email, otp }: AuthorizationSignInVerifyBody) => {
  return authNetworkClient.post<AuthorizationSignInVerifyResponseData>(`${RESOURCE}/sign-in/verify`, {
    body: { email, otp },
  });
};
