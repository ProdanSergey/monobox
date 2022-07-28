import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  DomainError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors";

const mapErrorToDomainError = (err: Error): DomainError => {
  if (err instanceof DomainError) {
    return err;
  }

  return new InternalError();
};

const mapStatusCodeFromError = (err: DomainError): number => {
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
  const domainError = mapErrorToDomainError(err);

  const status = mapStatusCodeFromError(domainError);

  res.status(status);

  const responseJSON: ResponseWithErrorMessageJSON = {
    status,
    message: domainError.message,
  };

  res.json(responseJSON);

  next();
};
