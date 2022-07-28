import { Operator } from "../domain/operator";
import { OperatorRepository } from "../ports/repository/operator";

type CreateOperatorCommandParams = {
  fullName: string;
  email: string;
};

export class CreateOperatorCommand {
  constructor(private readonly operatorRepository: OperatorRepository) {}

  async execute({ fullName, email }: CreateOperatorCommandParams): Promise<void> {
    await this.operatorRepository.create(Operator.create({ fullName, email }));
  }
}
