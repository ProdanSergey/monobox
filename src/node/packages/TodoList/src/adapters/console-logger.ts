import { Logger, LoggerContext } from "../ports/logger";

export class ConsoleLogger implements Logger {
  context: LoggerContext | null = null;

  withContext(context: LoggerContext): this {
    this.context = context;
    return this;
  }

  notify(message: string) {
    console.log(`${this.getTimestamp()}${this.getContext()}${message}`);
  }

  throw({ message }: Error): void {
    this.notify(message);
  }

  private getContext(): string {
    if (this.context) {
      return `${JSON.stringify(this.context, null, 2)}\n`;
    }

    return "";
  }

  private getTimestamp(): string {
    return `[${new Date().toISOString()}]\n`;
  }
}
