import { NextFunction, Request, Response } from "express";

export type HandlerFunction<Req, Res> = {
  (req: Req, res: Res): Promise<unknown>;
};

export type ResponseWithDataJSON = {
  status: number;
  data: unknown;
};

export const serialize = <Req extends Request, Res extends Response>(handler: HandlerFunction<Req, Res>) => {
  return async (req: Req, res: Res, next: NextFunction) => {
    try {
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
