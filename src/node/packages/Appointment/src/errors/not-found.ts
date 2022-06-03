import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
  constructor() {
    super("Not Found");
  }
}
