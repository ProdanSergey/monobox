import { DomainError } from "./domain-error";

export class BadRequestError extends DomainError {
  name = "BadRequestError";

  constructor(message: string) {
    super(`Bad Request: ${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
