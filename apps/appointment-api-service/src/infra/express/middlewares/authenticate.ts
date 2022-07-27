import type { Request, RequestHandler } from "express";

import { UnauthorizedError } from "@monobox/infra";
import { JwtToken } from "@monobox/appointment-core";

export type JwtTokenPayload = {
  id: string;
  fullName: string;
  email: string;
};

export type RequestGuard = <Req extends Request>(req: Req) => void;

export const asOperator: RequestGuard = async (req) => {
  const jwtToken = req.header("x-auth-token");

  if (!jwtToken) {
    throw new UnauthorizedError();
  }

  const jwt = new JwtToken();

  req.operator = await jwt.verify<JwtTokenPayload>(jwtToken);
};

export const asAssignee: RequestGuard = (req) => {
  const userToken = req.header("x-user-token");

  if (!userToken) {
    throw new UnauthorizedError();
  }

  req.token = userToken;
};

export class Strategy {
  constructor(private readonly guard: RequestGuard) {}

  next(nextArg: "route" | "router" | Error = new UnauthorizedError()): RequestHandler {
    return (req, _res, next) => {
      try {
        this.guard(req);
        next();
      } catch (error) {
        next(nextArg);
      }
    };
  }
}
