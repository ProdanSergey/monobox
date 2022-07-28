import { Document, Types } from "mongoose";

import { SessionDocument, SessionEntity } from "../../infra/mongo/entities/session";
import { SessionRepository } from "../../ports/repository/session";
import { Session, SessionRecord } from "../../domain/session";

const mapDocumentToSession = (document: Document<Types.ObjectId, unknown, SessionDocument>): Session => {
  const { _id, ...rest } = document.toObject();

  return Session.toModel({
    id: String(_id),
    ...rest,
  });
};

export class MongoDBSessionRepository implements SessionRepository {
  async create(record: Partial<SessionRecord>): Promise<Session> {
    const document = await SessionEntity.create(record);

    return mapDocumentToSession(document);
  }

  async find(token: string): Promise<Session | undefined> {
    const document = await SessionEntity.findOne({ token }).exec();

    if (!document) {
      return undefined;
    }

    return mapDocumentToSession(document);
  }
}
