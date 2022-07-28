import { DomainError } from "./domain-error";

export class UnauthorizedError extends DomainError {
  name = "UnauthorizedError";

  constructor() {
    super("Unauthorized");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
