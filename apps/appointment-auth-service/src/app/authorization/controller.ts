import { Request } from "express";
import { BaseController, serialize, validate } from "@monobox/infra";
import {
  AuthorizationSignUpBody,
  AuthorizationSignUpResponseData,
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
} from "@monobox/appointment-contract";

import { postSignInBodySchema, postSignUpBodySchema } from "./definition";

export class AuthorizationController extends BaseController {
  constructor() {
    super();

    this.router.post("/sign-up", validate(postSignUpBodySchema), serialize(this.handleSignUp));
    this.router.post("/sign-in", validate(postSignInBodySchema), serialize(this.handleSignIn));
    this.router.post("/sign-in/verify", validate(postSignUpBodySchema), serialize(this.handleSignInVerify));
  }

  handleSignUp = async (
    req: Request<unknown, unknown, AuthorizationSignUpBody>
  ): Promise<AuthorizationSignUpResponseData> => {
    const { fullName, email } = req.body;

    const otp = await CreateOperatorCommand().execute({ fullName, email });

    return { otp };
  };

  handleSignIn = async (req: Request<unknown, unknown, AuthorizationSignInBody>): Promise<void> => {
    const { email } = req.body;

    await SendOperatorOTPEmailCommand().execute({ email });
  };

  handleSignInVerify = async (
    req: Request<unknown, unknown, AuthorizationSignInVerifyBody>
  ): Promise<AuthorizationSignInVerifyResponseData> => {
    const { email, otp } = req.body;

    const operator = GetOperatorCommand().execute({ email, otp });

    return {
      fullName: operator.fullName,
      email: operator.email,
    };
  };
}
