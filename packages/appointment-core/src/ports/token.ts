export interface Token {
  sign<Payload>(payload: Payload): Promise<string>;
  verify<Payload>(token: string): Promise<Payload>;
}
