import {
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
  AuthorizationSignUpBody,
} from "@monobox/appointment-contract";

import { AppointmentNetworkClient } from "@monobox/appointment-library";

const RESOURCE = "authorization";

const networkClient = new AppointmentNetworkClient(process.env.API_SERVICE_URL);

export const signUpOperator = async ({ fullName, email }: AuthorizationSignUpBody) => {
  return networkClient.post<undefined>(`${RESOURCE}/sign-up`, {
    body: { fullName, email },
  });
};

export const signInOperator = async ({ email }: AuthorizationSignInBody) => {
  return networkClient.post<undefined>(`${RESOURCE}/sign-in`, {
    body: { email },
  });
};

export const signInVerifyOperator = async ({ email, otp }: AuthorizationSignInVerifyBody) => {
  return networkClient.post<AuthorizationSignInVerifyResponseData>(`${RESOURCE}/sign-in/verify`, {
    body: { email, otp },
  });
};
