import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";

export class CreateAppointmentCommand {
  constructor(private readonly store: Store) {}

  async execute(): Promise<Appointment> {
    const appointment = Appointment.create();

    await this.store.setState({ [appointment.id]: appointment });

    return appointment;
  }
}
