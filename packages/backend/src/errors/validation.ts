import { DomainError } from "./domain-error";

export class ValidationError extends DomainError {
  name = "ValidationError";

  constructor(message: string) {
    super(`Validation failed: ${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
