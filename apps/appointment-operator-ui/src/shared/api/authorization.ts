import {
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
  AuthorizationSignUpBody,
} from "@monobox/appointment-contract";

import { authNetworkService } from "../services/network.service";

const RESOURCE = "authorization";

export const signUpOperator = async ({ fullName, email }: AuthorizationSignUpBody) => {
  return authNetworkService.post<undefined>(`${RESOURCE}/sign-up`, {
    body: { fullName, email },
  });
};

export const signInOperator = async ({ email }: AuthorizationSignInBody) => {
  return authNetworkService.post<undefined>(`${RESOURCE}/sign-in`, {
    body: { email },
  });
};

export const signInVerifyOperator = async ({ email, otp }: AuthorizationSignInVerifyBody) => {
  return authNetworkService.post<AuthorizationSignInVerifyResponseData>(`${RESOURCE}/sign-in/verify`, {
    body: { email, otp },
  });
};
