import { authenticator } from "otplib";
import bcrypt from "bcrypt";

export type OtpId = string;
type OneTimePassword = string;

export type OtpRecord = {
  id: OtpId;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export class Otp {
  private record: OtpRecord;

  private constructor(record: OtpRecord) {
    this.record = record;
  }

  get email() {
    return this.record.email;
  }

  get password() {
    return this.record.password;
  }

  static async create({ email }: { email: string }): Promise<[Partial<OtpRecord>, OneTimePassword]> {
    const { OTP_SECRET } = process.env;

    const otp = authenticator.generate(OTP_SECRET);
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(otp, salt);

    return [
      {
        email,
        password,
      },
      otp,
    ];
  }

  static toRecord(otp: Otp): OtpRecord {
    return {
      id: otp.record.id,
      password: otp.record.password,
      email: otp.record.email,
      created_at: otp.record.created_at,
      updated_at: otp.record.updated_at,
    };
  }

  static toModel(record: OtpRecord): Otp {
    return new Otp(record);
  }
}
