import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validate = <Req extends Request, Res extends Response>(schema: AnySchema) => {
  return async (req: Req, _res: Res, next: NextFunction) => {
    try {
      await schema.validate(req);
    } catch (e) {
      next(e);
    }
  };
};
