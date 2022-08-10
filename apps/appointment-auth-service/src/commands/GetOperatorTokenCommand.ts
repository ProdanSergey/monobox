import { OperatorJwtTokenPayload } from "@monobox/appointment-contract";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@monobox/infra";
import { JwtToken } from "@monobox/appointment-core";

import { OperatorRepository } from "../ports/repository/operator";
import { OtpRepository } from "../ports/repository/otp";
import { Otp } from "../domain/otp";

type GetOperatorTokensCommandParams = {
  email: string;
  otp: string;
};

export class GetOperatorTokensCommand {
  constructor(private readonly operatorRepository: OperatorRepository, private readonly otpRepository: OtpRepository) {}

  async execute({ email, otp }: GetOperatorTokensCommandParams): Promise<{ accessToken: string }> {
    const operator = await this.operatorRepository.findByEmail(email);

    if (!operator) {
      throw new NotFoundError();
    }

    const storedOtp = await this.otpRepository.findByEmail(email);

    if (!storedOtp) {
      throw new BadRequestError("Expired");
    }

    const isAuthorized = await Otp.compare(otp, storedOtp.password);

    if (!isAuthorized) {
      throw new UnauthorizedError();
    }

    const jwt = new JwtToken();

    const accessToken = await jwt.sign<OperatorJwtTokenPayload>({
      id: operator.id,
      fullName: operator.fullName,
      email: operator.email,
    });

    this.otpRepository.remove(storedOtp.id);

    return {
      accessToken,
    };
  }
}
