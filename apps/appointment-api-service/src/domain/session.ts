import uniqId from "uniqid";
import { AppointmentId } from "./appointment";

export type SessionRecord = {
  id: string;
  token: string;
  appointmentId: AppointmentId;
  created_at: string;
  updated_at: string;
};

export class Session {
  private record: SessionRecord;

  private constructor(record: SessionRecord) {
    this.record = record;
  }

  get token() {
    return this.record.token;
  }

  get appointmentId() {
    return this.record.appointmentId;
  }

  static create({ appointmentId }: { appointmentId: string }): Partial<SessionRecord> {
    const token = uniqId();

    return {
      token,
      appointmentId,
    };
  }

  static toRecord(session: Session): SessionRecord {
    return {
      id: session.record.id,
      token: session.record.token,
      appointmentId: session.record.appointmentId,
      created_at: session.record.created_at,
      updated_at: session.record.updated_at,
    };
  }

  static toModel(record: SessionRecord): Session {
    return new Session(record);
  }
}
