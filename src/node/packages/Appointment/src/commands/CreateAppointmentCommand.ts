import { Logger } from "../ports/logger";
import { AppointmentService } from "../app/appointment.service";

export class CreateAppointmentCommand {
  constructor(private readonly logger: Logger, private readonly appointmentService: AppointmentService) {}

  async execute() {
    const { id } = await this.appointmentService.create();

    this.logger.print(`Appointment created [${id}]`);
  }
}
