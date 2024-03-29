import { AnyObject } from "@monobox/utils";

export interface Token {
  sign<Payload extends AnyObject>(payload: Payload): Promise<string>;
  verify<Payload extends AnyObject>(token: string): Promise<Payload>;
  decode<Payload extends AnyObject>(token: string): Promise<Payload>;
}
