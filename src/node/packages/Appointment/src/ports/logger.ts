export interface Logger {
  print(message: string): void;
  throw(message: string, type: string): void;
}
