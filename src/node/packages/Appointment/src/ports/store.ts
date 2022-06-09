import { AppointmentId, Appointment } from "../domain/appointment";

export type State = Record<AppointmentId, Appointment>;

export interface Store {
  getState(): Promise<State>;
  setState(state: State): Promise<void>;
}
