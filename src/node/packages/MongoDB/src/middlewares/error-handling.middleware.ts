import { Error as MongooseError } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../definitions/error.definition";

export const errorHandlingMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  let message: string;

  if (err instanceof MongooseError) {
    switch (err.name) {
      case "ValidationError":
        message = err.message;
        break;
      default:
        message = "Bad request";
    }
    res.status(400);
  } else if (err instanceof UnauthorizedError) {
    res.status(401);
    message = err.message;
  } else if (err instanceof NotFoundError) {
    res.status(404);
    message = err.message;
  } else {
    res.status(500);
    message = "Something wrong happened";
  }

  res.json({
    status: res.statusCode,
    message,
  });

  next(err);
};
