import { Session, SessionRecord } from "../../domain/session";

export interface SessionRepository {
  create(record: Partial<SessionRecord>): Promise<Session>;
  find(token: string): Promise<Session | undefined>;
}
