import { AppointmentService } from "../app/appointment.service";
import { NotFoundError } from "../errors/not-found";
import { Logger } from "../ports/logger";

type GetCommand = {
  id: string;
};

export class GetAppointmentCommand {
  constructor(private readonly logger: Logger, private readonly appointmentService: AppointmentService) {}

  async execute({ id }: GetCommand) {
    const appointment = await this.appointmentService.get(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    this.logger.print(`[${id}]: ${appointment?.created_at}`);
  }
}
