export interface Token {
  issue<Payload>(payload: Payload): Promise<string>;
  verify<Payload>(token: string): Promise<Payload>;
}
