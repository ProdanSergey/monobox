import { AnyObject } from "@monobox/toolkit";

export interface Token {
  sign<Payload extends AnyObject>(payload: Payload): Promise<string>;
  verify<Payload extends AnyObject>(token: string): Promise<Payload>;
}
