import dayjs from "dayjs";

export type AppointmentId = string;

export type AppointmentAssignee = {
  fullName: string;
  email: string;
};

export type AppointmentOperator = {
  fullName: string;
  email: string;
};

export type AppointmentRecord = {
  id: AppointmentId;
  ticket: string;
  assignee: AppointmentAssignee;
  operator?: AppointmentOperator;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export class Appointment {
  private record: AppointmentRecord;

  private constructor(record: AppointmentRecord) {
    this.record = record;
  }

  get id() {
    return this.record.id;
  }

  get ticket() {
    return this.record.ticket;
  }

  get assignee() {
    return this.record.assignee;
  }

  get operator() {
    return this.record.operator;
  }

  get completed() {
    return this.record.completed;
  }

  get created_at() {
    return this.record.created_at;
  }

  get updated_at() {
    return this.record.updated_at;
  }

  pick(operator: AppointmentOperator) {
    this.update({ operator });
  }

  complete() {
    this.update({ completed: true });
  }

  private update(record: Partial<AppointmentRecord>) {
    this.record = { ...this.record, ...record };
  }

  static create({ assignee }: { assignee: AppointmentAssignee }): Partial<AppointmentRecord> {
    const now = dayjs();

    return {
      ticket: Appointment.generateId(now),
      assignee,
      completed: false,
    };
  }

  private static generateId(date: dayjs.Dayjs): AppointmentId {
    return `AP-${date.format("HH/mm/ss/SSS")}`;
  }

  static toRecord(appointment: Appointment): AppointmentRecord {
    return {
      id: appointment.id,
      ticket: appointment.ticket,
      assignee: appointment.assignee,
      operator: appointment.operator,
      completed: appointment.completed,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
  }

  static toModel(record: AppointmentRecord): Appointment {
    return new Appointment(record);
  }
}
