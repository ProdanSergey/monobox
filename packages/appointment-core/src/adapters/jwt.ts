import jwt from "jsonwebtoken";
import isObject from "lodash/isObject";
import ms from "ms";

import { Token } from "../ports/token";

export class JwtToken implements Token {
  async issue<Payload>(payload: Payload): Promise<string> {
    if (!isObject(payload)) {
      throw new Error("Payload must be an object");
    }

    const { JWT_SECRET } = process.env;

    return jwt.sign(payload, JWT_SECRET, { expiresIn: ms("1h") });
  }
  async verify<Payload>(jwtToken: string): Promise<Payload> {
    const assertJwtPayload = (payload: string | jwt.JwtPayload): Payload => {
      if (!isObject(payload)) {
        throw new Error("Payload is not an object");
      }

      return payload as Payload;
    };

    const { JWT_SECRET } = process.env;

    const payload = jwt.verify(jwtToken, JWT_SECRET);

    return assertJwtPayload(payload);
  }
}
