export type LoggerContext = Record<string, any>;

export interface Logger {
  withContext(context: LoggerContext): this
  notify(message: string): void
  throw(error: Error): void
}