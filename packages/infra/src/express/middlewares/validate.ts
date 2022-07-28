import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError as YupError } from "yup";
import { InternalError, ValidationError } from "../errors";

const mapError = (e: unknown): Error => {
  if (e instanceof YupError) {
    return new ValidationError(e.errors.join(","));
  }

  return new InternalError();
};

export const validate = <Req extends Request, Res extends Response>(schema: AnySchema) => {
  return async (req: Req, _res: Res, next: NextFunction) => {
    try {
      await schema.validate(req);
      next();
    } catch (e) {
      next(mapError(e));
    }
  };
};
