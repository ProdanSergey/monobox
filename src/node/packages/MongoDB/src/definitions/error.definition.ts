export class NotFoundError extends Error {
  constructor() {
    super("Not Found");
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
  }
}
