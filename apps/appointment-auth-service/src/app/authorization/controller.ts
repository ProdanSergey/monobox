import { Request, Response } from "express";
import { BaseController, serialize, validate } from "@monobox/infra";
import { AuthorizationSessionBody } from "@monobox/appointment-contract";

import { postSessionBodySchema } from "./definition";

export class AuthorizationController extends BaseController {
  constructor() {
    super();

    this.router.post("/session", validate(postSessionBodySchema), serialize(this.handleSession));
  }

  handleSession = async (req: Request<unknown, unknown, AuthorizationSessionBody>, res: Response) => {
    if (!req.session.user) {
      const { fullName, email } = req.body;

      req.session.user = { fullName, email };
    }

    res.status(201);
  };
}
