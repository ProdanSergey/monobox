import { Logger } from "../ports/logger";
import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";

export class CreateAppointmentCommand {
  constructor(private readonly logger: Logger, private readonly store: Store) {}

  async execute() {
    const appointment = Appointment.create();

    await this.store.setState({ [appointment.id]: appointment });

    this.logger.print(`Appointment created [${appointment.id}]`);
  }
}
