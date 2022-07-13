import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repository/appointment";

export class CreateAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute(): Promise<Appointment> {
    return await this.repository.create(Appointment.create());
  }
}
