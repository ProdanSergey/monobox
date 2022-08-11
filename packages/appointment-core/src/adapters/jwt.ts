import jwt, { JsonWebTokenError } from "jsonwebtoken";
import type { Jwt, JwtPayload, SignOptions, VerifyOptions, DecodeOptions } from "jsonwebtoken";

import { AnyObject, isObject } from "@monobox/toolkit";

import { Token } from "../ports/token";

type JwtTokenOptions = {
  sign?: SignOptions;
  verify?: VerifyOptions;
  decode?: DecodeOptions;
};
export class JwtToken implements Token {
  constructor(private readonly options?: JwtTokenOptions) {}

  private static defaultSignOptions: SignOptions = {
    expiresIn: "1h",
  };

  async sign<Payload extends AnyObject>(payload: Payload): Promise<string> {
    if (!isObject<Payload>(payload)) {
      throw new Error("Payload must be an object");
    }

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      JwtToken.throwMissingJwtSecretError();
    }

    return jwt.sign(payload, JWT_SECRET, { ...JwtToken.defaultSignOptions, ...this.options?.sign });
  }

  async verify<Payload extends AnyObject>(token: string): Promise<Payload> {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      JwtToken.throwMissingJwtSecretError();
    }

    const payload = jwt.verify(token, JWT_SECRET, this.options?.verify);

    return JwtToken.assertJwtPayload<Payload>(payload);
  }

  async decode<Payload extends AnyObject>(token: string): Promise<Payload> {
    const payload = jwt.decode(token, this.options?.decode);

    return JwtToken.assertJwtPayload<Payload>(payload);
  }

  private static assertJwtPayload<Payload extends AnyObject>(payload: Jwt | JwtPayload | string | null): Payload {
    if (!isObject<Payload>(payload)) {
      throw new JsonWebTokenError("Error while parsing JWT payload");
    }

    return payload;
  }

  private static throwMissingJwtSecretError(): never {
    throw new JsonWebTokenError("JWT_SECRET must be provided as environment variable");
  }
}
