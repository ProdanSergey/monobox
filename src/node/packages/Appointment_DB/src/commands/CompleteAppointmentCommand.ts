import { AppointmentId } from "../domain/appointment";
import { BadRequestError, NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repository/appointment";

export type CompleteAppointmentCommandParams = {
  id: AppointmentId;
};

export class CompleteAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ id }: CompleteAppointmentCommandParams): Promise<void> {
    const appointment = await this.repository.findOne(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    if (appointment.completed) {
      throw new BadRequestError("Appointment is already completed");
    }

    appointment.complete();

    await this.repository.update(appointment);
  }
}
