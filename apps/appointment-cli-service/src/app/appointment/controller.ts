import { Logger } from "@monobox/appointment-core";

import { CLI, CLICommand } from "../../ports/cli";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { DeleteQuery, GetQuery, ListQuery, UpdateQuery } from "./definition";
import { Appointment } from "../../domain/appointment";
import { UpdateAppointmentCommand } from "../../commands/UpdateAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
import { AppointmentRepository } from "../../ports/repository/appointment";

export class AppointmentController {
  constructor(
    private readonly cliService: CLI,
    private readonly logger: Logger,
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async process() {
    switch (this.cliService.getCommand()) {
      case CLICommand.CREATE: {
        return this.handleCreate();
      }
      case CLICommand.GET: {
        return this.handleGet();
      }
      case CLICommand.DELETE: {
        return this.handleDelete();
      }
      case CLICommand.UPDATE: {
        return this.handleUpdate();
      }
      case CLICommand.LIST: {
        return this.handleList();
      }
    }
  }

  private async handleCreate() {
    const command = new CreateAppointmentCommand(this.appointmentRepository);

    const appointment = await command.execute();

    this.logger.print(`[${appointment.id}] has been created`);
  }

  private async handleGet() {
    const { id } = this.cliService.getQuery<GetQuery>();

    const command = new GetAppointmentCommand(this.appointmentRepository);

    const appointment = await command.execute({ id });

    const response = JSON.stringify(Appointment.toRecord(appointment));

    this.logger.print(response);
  }

  private async handleDelete() {
    const { id } = this.cliService.getQuery<DeleteQuery>();

    const command = new DeleteAppointmentCommand(this.appointmentRepository);

    await command.execute({ id });

    this.logger.print(`[${id}] has been deleted`);
  }

  private async handleUpdate() {
    const { id, completed } = this.cliService.getQuery<UpdateQuery>();

    const command = new UpdateAppointmentCommand(this.appointmentRepository);

    const appointment = await command.execute({ id, completed });

    const response = JSON.stringify(Appointment.toRecord(appointment));

    this.logger.print(response);
  }

  private async handleList() {
    const { completed, limit } = this.cliService.getQuery<ListQuery>();

    const command = new ListAppointmentCommand(this.appointmentRepository);

    const appointments = await command.execute({ completed, limit });

    const response = appointments.map((entity) => JSON.stringify(Appointment.toRecord(entity))).join("\n");

    this.logger.print(response);
  }
}
