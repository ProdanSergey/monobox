export enum CLICommand {
  CREATE = "create",
  GET = "get",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  CLEAR = "clear",
}

export interface CLI {
  getCommand(): CLICommand;
  getQuery<T extends Record<string, unknown>>(): T;
}
