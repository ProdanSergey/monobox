import { Document, Types } from "mongoose";
import { NotFoundError } from "@monobox/backend";

import { OtpDocument, OtpEntity } from "../../infra/mongo/entities/otp";
import { OtpRepository } from "../../ports/repository/otp";
import { Otp, OtpId, OtpRecord } from "../../domain/otp";

const mapDocumentToOtp = (document: Document<Types.ObjectId, unknown, OtpDocument>): Otp => {
  const { _id, ...record } = document.toObject();

  return Otp.toModel({
    id: String(_id),
    ...record,
  });
};

export class MongoDBOtpRepository implements OtpRepository {
  async upsert(record: Partial<OtpRecord>): Promise<void> {
    await OtpEntity.findOneAndUpdate({ email: record.email }, record, { upsert: true }).exec();
  }

  async findByEmail(email: string): Promise<Otp | undefined> {
    const document = await OtpEntity.findOne({ email }).exec();

    if (!document) {
      return undefined;
    }

    return mapDocumentToOtp(document);
  }

  async remove(id: OtpId): Promise<void> {
    const document = await OtpEntity.findByIdAndDelete(id).exec();

    if (!document) {
      throw new NotFoundError();
    }
  }
}
