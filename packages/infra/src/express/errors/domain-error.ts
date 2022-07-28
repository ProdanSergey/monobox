export class DomainError extends Error {
  name = "DomainError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
