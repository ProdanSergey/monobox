import { Operator, OperatorRecord, OperatorId } from "../../domain/operator";

export interface OperatorRepository {
  create(record: Partial<OperatorRecord>): Promise<Operator>;
  find(id: OperatorId): Promise<Operator | undefined>;
  findByEmail(email: string): Promise<Operator | undefined>;
}
