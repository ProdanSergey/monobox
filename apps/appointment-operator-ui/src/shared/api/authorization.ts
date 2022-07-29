import {
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
  AuthorizationSignUpBody,
} from "@monobox/appointment-contract";
import { post } from "@monobox/appointment-library";

const RESOURCE = "authorization";

export const signUpOperator = async ({ fullName, email }: AuthorizationSignUpBody) => {
  return post<undefined>(`${RESOURCE}/sign-up`, {
    baseUrl: process.env.AUTH_SERVICE_URL,
    body: { fullName, email },
  });
};

export const signInOperator = async ({ email }: AuthorizationSignInBody) => {
  return post<undefined>(`${RESOURCE}/sign-in`, {
    baseUrl: process.env.AUTH_SERVICE_URL,
    body: { email },
  });
};

export const signInVerifyOperator = async ({ email, otp }: AuthorizationSignInVerifyBody) => {
  return post<AuthorizationSignInVerifyResponseData>(`${RESOURCE}/sign-in/verify`, {
    baseUrl: process.env.AUTH_SERVICE_URL,
    body: { email, otp },
  });
};
