import { Appointment } from "../models/appointment";

export type State = Record<string, Appointment>;

export interface Store {
  getState(key: string): Promise<Appointment | undefined>;
  setState(key: string, value: Appointment): Promise<void>;
}
