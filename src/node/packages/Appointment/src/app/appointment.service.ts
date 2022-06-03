import { Appointment } from "../models/appointment";
import { Store } from "../ports/store";

export class AppointmentService {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  async create() {
    const appointment = new Appointment();

    await this.store.setState(appointment.id, appointment);

    return appointment;
  }

  get(id: string): Promise<Appointment | undefined> {
    return this.store.getState(id);
  }
}
