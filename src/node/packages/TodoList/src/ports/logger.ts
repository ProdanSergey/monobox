export type LoggerContext = Record<string, unknown>;

export interface Logger {
  withContext(context: LoggerContext): this;
  notify(message: string): void;
  throw(error: Error): void;
}
