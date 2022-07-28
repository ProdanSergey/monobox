export interface Logger {
  print(message: string): void | Promise<void>;
  alert(message: string, type?: string): void | Promise<void>;
}
