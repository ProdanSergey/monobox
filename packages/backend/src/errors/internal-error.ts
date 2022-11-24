import { DomainError } from "./domain-error";

export class InternalError extends DomainError {
  name = "InternalError";

  constructor() {
    super("Internal Error");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
