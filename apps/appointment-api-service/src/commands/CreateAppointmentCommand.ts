import { Appointment, AppointmentAssignee } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repository/appointment";

type CreateAppointmentCommandParams = {
  assignee: AppointmentAssignee;
};

export class CreateAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ assignee }: CreateAppointmentCommandParams): Promise<Appointment> {
    return await this.repository.create(Appointment.create(assignee));
  }
}
