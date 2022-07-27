export type OperatorId = string;

export type OperatorRecord = {
  id: OperatorId;
  fullName: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export class Operator {
  private record: OperatorRecord;

  private constructor(record: OperatorRecord) {
    this.record = record;
  }

  get fullName() {
    return this.record.fullName;
  }

  get email() {
    return this.record.email;
  }

  static create({ fullName, email }: { fullName: string; email: string }): Partial<OperatorRecord> {
    return {
      fullName,
      email,
    };
  }

  static toRecord(operator: Operator): OperatorRecord {
    return {
      id: operator.record.id,
      fullName: operator.record.fullName,
      email: operator.record.email,
      created_at: operator.record.created_at,
      updated_at: operator.record.updated_at,
    };
  }

  static toModel(record: OperatorRecord): Operator {
    return new Operator(record);
  }
}
