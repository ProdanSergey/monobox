import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../domain/error";

const mapStatusCodeFromError = (err: Error): number => {
  if (err instanceof BadRequestError) return 400;
  if (err instanceof UnauthorizedError) return 403;
  if (err instanceof NotFoundError) return 404;

  return 500;
};

export const errorHandlingMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  const status = mapStatusCodeFromError(err);

  res.status(status);

  res.json({
    status,
    message: err.message,
  });

  next();
};
