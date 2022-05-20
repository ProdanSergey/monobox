import type { NextFunction, Request, Response } from "express";

type HandlerFunction<Req, Res> = {
  (req: Req, res: Res): Promise<unknown>;
};

export const withErrorHandler = <Req = Request, Res = Response>(handler: HandlerFunction<Req, Res>) => {
  return async (req: Req, res: Res, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (e) {
      next(e);
    }
  };
};
