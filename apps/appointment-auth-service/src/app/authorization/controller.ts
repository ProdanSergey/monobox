import { Request, Response } from "express";
import { BaseController, serialize, validate } from "@monobox/infra";
import { AuthorizationSessionBody } from "@monobox/appointment-contract";

import { postSignInBodySchema, postSignUpBodySchema } from "./definition";

export class AuthorizationController extends BaseController {
  constructor() {
    super();

    this.router.post("/sign-up", validate(postSignUpBodySchema), serialize(this.handleSignUp));
    this.router.post("/sign-in", validate(postSignInBodySchema), serialize(this.handleSignIn));
    this.router.post("/sign-in/verify", validate(postSignUpBodySchema), serialize(this.handleSignInVerify));
  }

  handleSignUp = async (req: Request<unknown, unknown, AuthorizationSessionBody>, res: Response) => {};

  handleSignIn = async (req: Request<unknown, unknown, AuthorizationSessionBody>, res: Response) => {};

  handleSignInVerify = async (req: Request<unknown, unknown, AuthorizationSessionBody>, res: Response) => {};
}
