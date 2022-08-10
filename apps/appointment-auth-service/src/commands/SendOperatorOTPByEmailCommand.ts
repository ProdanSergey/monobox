import { Mailer } from "@monobox/appointment-core";
import { NotFoundError } from "@monobox/infra";
import { Otp } from "../domain/otp";
import { OperatorRepository } from "../ports/repository/operator";
import { OtpRepository } from "../ports/repository/otp";

type SendOperatorOTPByEmailCommandParams = {
  email: string;
};

export class SendOperatorOTPByEmailCommand {
  constructor(
    private readonly operatorRepository: OperatorRepository,
    private readonly otpRepository: OtpRepository,
    private readonly mailer: Mailer
  ) {}

  async execute({ email }: SendOperatorOTPByEmailCommandParams): Promise<void> {
    const operator = await this.operatorRepository.findByEmail(email);

    if (!operator) {
      throw new NotFoundError();
    }

    const [otpRecord, otp] = await Otp.create({ email });
    await this.otpRepository.upsert(otpRecord);

    this.mailer.send({
      address: email,
      subject: "One Time Password",
      body: otp,
    });
  }
}
