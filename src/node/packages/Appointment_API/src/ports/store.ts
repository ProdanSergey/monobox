import { AppointmentId, Appointment } from "../domain/appointment";

export type Store = Map<AppointmentId, Appointment>;
