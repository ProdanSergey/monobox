import { Logger } from "../ports/logger";

export class ConsoleLogger implements Logger {
  print(message: string): void {
    console.log(">>>", message);
  }
  throw(message: string, type = "InternalError"): void {
    console.log(">>>", `[${type}]:`, message);
  }
}
