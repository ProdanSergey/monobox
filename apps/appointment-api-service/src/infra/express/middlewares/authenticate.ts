import type { Request, RequestHandler } from "express";

import { UnauthorizedError } from "@monobox/backend";
import { JwtToken } from "@monobox/appointment-core";
import { OperatorJwtTokenPayload, X_AUTH_TOKEN, X_USER_TOKEN } from "@monobox/appointment-contract";

export type RequestGuard = <Req extends Request>(req: Req) => void | Promise<void>;

export const asOperator: RequestGuard = async (req) => {
  const jwtToken = req.header(X_AUTH_TOKEN);

  if (!jwtToken) {
    throw new UnauthorizedError();
  }

  const jwt = new JwtToken();

  req.operator = await jwt.verify<OperatorJwtTokenPayload>(jwtToken);
};

export const asAssignee: RequestGuard = (req) => {
  const userToken = req.header(X_USER_TOKEN);

  if (!userToken) {
    throw new UnauthorizedError();
  }

  req.token = userToken;
};

export class Strategy {
  constructor(private readonly guard: RequestGuard) {}

  next(redirect?: "route" | "router"): RequestHandler {
    return async (req, _res, next) => {
      try {
        await this.guard(req);
        next();
      } catch (error) {
        next(redirect ?? error);
      }
    };
  }
}
