import { UnauthorizedError } from "@monobox/infra/dist/express/errors";
import { Session } from "../domain/session";
import { SessionRepository } from "../ports/repository/session";

type FindUserSessionCommandParams = {
  token: string;
};

export class FindUserSessionCommand {
  constructor(private readonly repository: SessionRepository) {}

  async execute({ token }: FindUserSessionCommandParams): Promise<Session> {
    const session = await this.repository.find(token);

    if (!session) {
      throw new UnauthorizedError();
    }

    return session;
  }
}
