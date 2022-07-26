export class NotFoundError extends Error {
  name = "NotFoundError";

  constructor() {
    super("Not Found");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
