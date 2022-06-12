import * as dayjs from "dayjs";

export type AppointmentId = string;

export type AppointmentRecord = {
  _id: AppointmentId;
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

  static create() {
    const now = dayjs();

    return new Appointment({
      _id: Appointment.generateId(now),
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
      completed: appointment.completed,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
  }

  static toModel(record: AppointmentRecord): Appointment {
    return new Appointment(record);
  }
}
