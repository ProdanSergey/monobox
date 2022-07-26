import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError, ValidationError } from "../errors";

const mapStatusCodeFromError = (err: Error): number => {
  if (err instanceof BadRequestError || err instanceof ValidationError) return 400;
  if (err instanceof UnauthorizedError) return 403;
  if (err instanceof NotFoundError) return 404;

  return 500;
};

export type ResponseWithErrorMessageJSON = {
  status: number;
  message: string;
};

export const errorHandling = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  const status = mapStatusCodeFromError(err);

  res.status(status);

  const responseJSON: ResponseWithErrorMessageJSON = {
    status,
    message: err.message,
  };

  res.json(responseJSON);

  next();
};
