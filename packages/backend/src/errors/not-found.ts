import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
  name = "NotFoundError";

  constructor() {
    super("Not Found");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
