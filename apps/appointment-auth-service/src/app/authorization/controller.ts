import { Request, Response } from "express";
import { BaseController, serialize, validate } from "@monobox/infra";
import {
  AuthorizationSignUpBody,
  AuthorizationSignInBody,
  AuthorizationSignInVerifyBody,
  AuthorizationSignInVerifyResponseData,
} from "@monobox/appointment-contract";

import { OperatorRepository } from "../../ports/repository/operator";
import { OtpRepository } from "../../ports/repository/otp";

import { CreateOperatorCommand } from "../../commands/CreateOperatorCommand";
import { SendOperatorOTPByEmailCommand } from "../../commands/SendOperatorOTPByEmailCommand";

import { postSignInBodySchema, postSignInVerifyBodySchema, postSignUpBodySchema } from "./definition";
import { GetOperatorTokensCommand } from "../../commands/GetOperatorTokenCommand";
import { Mailer } from "@monobox/appointment-core";

export class AuthorizationController extends BaseController {
  constructor(
    private readonly operatorRepository: OperatorRepository,
    private readonly otpRepository: OtpRepository,
    private readonly mailer: Mailer
  ) {
    super();

    this.router.post("/sign-up", validate(postSignUpBodySchema), serialize(this.handleSignUp));
    this.router.post("/sign-in", validate(postSignInBodySchema), serialize(this.handleSignIn));
    this.router.post("/sign-in/verify", validate(postSignInVerifyBodySchema), serialize(this.handleSignInVerify));
  }

  handleSignUp = async (req: Request<unknown, unknown, AuthorizationSignUpBody>, res: Response): Promise<void> => {
    const { fullName, email } = req.body;

    await new CreateOperatorCommand(this.operatorRepository).execute({
      fullName,
      email,
    });

    res.status(201);
  };

  handleSignIn = async (req: Request<unknown, unknown, AuthorizationSignInBody>): Promise<void> => {
    const { email } = req.body;

    await new SendOperatorOTPByEmailCommand(this.operatorRepository, this.otpRepository, this.mailer).execute({
      email,
    });
  };

  handleSignInVerify = async (
    req: Request<unknown, unknown, AuthorizationSignInVerifyBody>
  ): Promise<AuthorizationSignInVerifyResponseData> => {
    const { email, otp } = req.body;

    const { accessToken } = await new GetOperatorTokensCommand(this.operatorRepository, this.otpRepository).execute({
      email,
      otp,
    });

    return {
      accessToken,
    };
  };
}
