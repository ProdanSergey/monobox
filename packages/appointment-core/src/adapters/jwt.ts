import jwt from "jsonwebtoken";
import isObject from "lodash/isObject";

import { Token } from "../ports/token";
export class JwtToken implements Token {
  constructor(private readonly options?: { sign?: jwt.SignOptions; verify?: jwt.VerifyOptions }) {}

  private static defaultSignOptions: jwt.SignOptions = {
    expiresIn: "1h",
  };

  async sign<Payload>(payload: Payload): Promise<string> {
    if (!isObject(payload)) {
      throw new Error("Payload must be an object");
    }

    const { JWT_SECRET } = process.env;

    return jwt.sign(payload, JWT_SECRET, { ...JwtToken.defaultSignOptions, ...this.options?.sign });
  }

  async verify<Payload>(token: string): Promise<Payload> {
    const { JWT_SECRET } = process.env;

    const payload = jwt.verify(token, JWT_SECRET, { ...JwtToken.defaultSignOptions, ...this.options?.verify });

    return JwtToken.assertJwtPayload(payload);
  }

  private static assertJwtPayload<Payload>(payload: string | jwt.Jwt | jwt.JwtPayload): Payload {
    if (!isObject(payload)) {
      throw new Error("Error while parsing JWT payload");
    }

    return payload as Payload;
  }
}
