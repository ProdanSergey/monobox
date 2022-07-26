export class UnauthorizedError extends Error {
  name = "UnauthorizedError";

  constructor() {
    super("Unauthorized");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
