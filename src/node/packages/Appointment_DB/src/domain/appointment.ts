import * as dayjs from "dayjs";

export type AppointmentId = string;

export type AppointmentAssignee = {
  fullName: string;
  email: string;
};

export type AppointmentRecord = {
  _id: AppointmentId;
  assignee: AppointmentAssignee;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export class Appointment {
  private record: AppointmentRecord;

  constructor(record: AppointmentRecord) {
    this.record = record;
  }

  get id() {
    return this.record._id;
  }

  get assignee() {
    return this.record.assignee;
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

  update(partial: Partial<AppointmentRecord>) {
    this.record = { ...this.record, ...partial };
  }

  static create(assignee: AppointmentAssignee) {
    const now = dayjs();

    return new Appointment({
      _id: Appointment.generateId(now),
      assignee,
      completed: false,
      created_at: "",
      updated_at: "",
    });
  }

  private static generateId(date: dayjs.Dayjs): AppointmentId {
    return `AP-${date.format("HH/mm/ss/SSS")}`;
  }

  static toRecord(appointment: Appointment): AppointmentRecord {
    return {
      _id: appointment.id,
      assignee: appointment.assignee,
      completed: appointment.completed,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
  }

  static toModel(record: AppointmentRecord): Appointment {
    return new Appointment(record);
  }
}
