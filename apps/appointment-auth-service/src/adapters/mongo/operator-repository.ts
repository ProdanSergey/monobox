import { Document, Types } from "mongoose";

import { OperatorDocument, OperatorEntity } from "../../infra/mongo/entities/operator";
import { OperatorRepository } from "../../ports/repository/operator";
import { Operator, OperatorRecord } from "../../domain/operator";

const mapDocumentToOperator = (document: Document<Types.ObjectId, unknown, OperatorDocument>): Operator => {
  const { _id, ...record } = document.toObject();

  return Operator.toModel({
    id: String(_id),
    ...record,
  });
};

export class MongoDBOperatorRepository implements OperatorRepository {
  async create(record: Partial<OperatorRecord>): Promise<Operator> {
    const document = await OperatorEntity.create(record);

    return mapDocumentToOperator(document);
  }

  async find(id: string): Promise<Operator | undefined> {
    const document = await OperatorEntity.findById(id).exec();

    if (!document) {
      return undefined;
    }

    return mapDocumentToOperator(document);
  }

  async findByEmail(email: string): Promise<Operator | undefined> {
    const document = await OperatorEntity.findOne({ email }).exec();

    if (!document) {
      return undefined;
    }

    return mapDocumentToOperator(document);
  }
}
