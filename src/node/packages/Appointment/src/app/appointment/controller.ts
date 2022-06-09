import { CLI, CLICommand } from "../../ports/cli";
import { Logger } from "../../ports/logger";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { Store } from "../../ports/store";

type GetQuery = {
  id: string;
};

export class AppointmentController {
  constructor(private readonly cliService: CLI, private readonly logger: Logger, private readonly store: Store) {}

  async process() {
    switch (this.cliService.getCommand()) {
      case CLICommand.CREATE: {
        const command = new CreateAppointmentCommand(this.logger, this.store);
        command.execute();
        break;
      }
      case CLICommand.GET: {
        const { id } = this.cliService.getQuery<GetQuery>();

        const command = new GetAppointmentCommand(this.logger, this.store);
        command.execute({ id });
        break;
      }
    }
  }
}
