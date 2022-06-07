import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

type HandlerFunction<Req, Res> = {
  (req: Req, res: Res): Promise<unknown>;
};

export const route = <Req extends Request, Res extends Response>(
  handler: HandlerFunction<Req, Res>,
  reqSchema?: AnySchema
) => {
  return async (req: Req, res: Res, next: NextFunction) => {
    try {
      if (reqSchema) {
        await reqSchema.validate(req);
      }

      res.json({
        status: res.statusCode,
        data: await handler(req, res),
      });
    } catch (e) {
      next(e);
    }
  };
};
