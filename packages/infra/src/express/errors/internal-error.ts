export class InternalError extends Error {
  name = "InternalError";

  constructor() {
    super("Internal Error");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
