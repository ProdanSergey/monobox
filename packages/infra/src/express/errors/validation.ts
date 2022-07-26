export class ValidationError extends Error {
  name = "ValidationError";

  constructor(message: string) {
    super(`Validation failed: ${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
