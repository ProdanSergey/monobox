import { Appointment, AppointmentRecord, AppointmentId } from "../../domain/appointment";

export interface AppointmentRepository {
  create(record: Partial<AppointmentRecord>): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  findOne(id: AppointmentId): Promise<Appointment | undefined>;
  findMany(filter: { completed?: boolean; limit?: number }): Promise<Appointment[]>;
  remove(id: AppointmentId): Promise<void>;
}
