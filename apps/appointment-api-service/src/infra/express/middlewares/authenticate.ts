import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError, InternalError } from "@monobox/infra";
import { AuthorizationOperatorJwtPayload } from "@monobox/appointment-contract";

const assertJwtPayload = (payload: string | jwt.JwtPayload): AuthorizationOperatorJwtPayload => {
  if (typeof payload !== "object" || (!payload.fullName && !payload.email)) {
    throw new InternalError();
  }

  return {
    fullName: payload.fullName,
    email: payload.email,
  };
};

export const asOperator: RequestHandler = (req, _res, next) => {
  const authToken = req.header("x-auth-token");

  if (!authToken) {
    throw new UnauthorizedError();
  }

  const { JWT_SECRET } = process.env;

  const payload = jwt.verify(authToken, JWT_SECRET);
  req.operator = assertJwtPayload(payload);
  next();
};

export const asAssignee: RequestHandler = (req, _res, next) => {
  const userToken = req.header("x-user-token");

  if (!userToken) {
    throw new UnauthorizedError();
  }

  req.token = userToken;
  next();
};

export class Strategy {
  constructor(private readonly requestHandler: RequestHandler) {}

  next(nextArg: "route" | "router" | Error = new UnauthorizedError()): RequestHandler {
    return (req, res, next) => {
      try {
        this.requestHandler(req, res, next);
      } catch (error) {
        next(nextArg);
      }
    };
  }
}
