import { Appointment, AppointmentId } from "../../domain/appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  findOne(id: AppointmentId): Promise<Appointment | undefined>;
  findMany(filter: { completed?: boolean; limit?: number }): Promise<Appointment[]>;
  remove(id: AppointmentId): Promise<void>;
}
