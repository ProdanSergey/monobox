export class BadRequestError extends Error {
  name = "BadRequestError";

  constructor(message: string) {
    super(`Bad Request: ${message}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
