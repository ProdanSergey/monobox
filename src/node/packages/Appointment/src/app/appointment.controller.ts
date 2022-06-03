import { CLICommand } from "../definitions/cli";
import { Logger } from "../ports/logger";
import { mapCLIToArgumentSequence, mapArgumentToCLICommand, mapArgumentToCLIQuery } from "../mappers/cli";
import { CreateAppointmentCommand } from "../commands/CreateAppointmentCommand";
import { AppointmentService } from "./appointment.service";
import { GetAppointmentCommand } from "../commands/GetAppointmentCommand";

type GetQuery = {
  id: string;
};

export class AppointmentController {
  constructor(private readonly logger: Logger, private readonly appointmentService: AppointmentService) {}

  async process(cliCommands: string[]) {
    const [commandName, commandQuery] = mapCLIToArgumentSequence(cliCommands);

    const cliCommand = mapArgumentToCLICommand(commandName);

    switch (cliCommand) {
      case CLICommand.CREATE: {
        const command = new CreateAppointmentCommand(this.logger, this.appointmentService);
        command.execute();
        break;
      }
      case CLICommand.GET: {
        const { id } = mapArgumentToCLIQuery<GetQuery>(commandQuery);

        const command = new GetAppointmentCommand(this.logger, this.appointmentService);
        command.execute({ id });
        break;
      }
    }
  }
}
