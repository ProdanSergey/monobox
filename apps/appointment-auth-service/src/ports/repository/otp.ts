import { Otp, OtpRecord, OtpId } from "../../domain/otp";

export interface OtpRepository {
  upsert(record: Partial<OtpRecord>): Promise<void>;
  findByEmail(email: string): Promise<Otp | undefined>;
  remove(id: OtpId): Promise<void>;
}
