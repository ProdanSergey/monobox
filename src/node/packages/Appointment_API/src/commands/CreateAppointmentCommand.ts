import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";

export class CreateAppointmentCommand {
  constructor(private readonly store: Store) {}

  execute(): Appointment {
    const appointment = Appointment.create();

    this.store.set(appointment.id, appointment);

    return appointment;
  }
}
