import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export type HandlerFunction<Req, Res> = {
  (req: Req, res: Res): Promise<unknown>;
};

export type ResponseWithDataJSON = {
  status: number;
  data: unknown;
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

      const responseJSON: ResponseWithDataJSON = {
        status: res.statusCode,
        data: await handler(req, res),
      };

      res.json(responseJSON);
    } catch (e) {
      next(e);
    }
  };
};
