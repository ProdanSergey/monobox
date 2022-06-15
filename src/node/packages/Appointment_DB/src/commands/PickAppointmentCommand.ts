import { AppointmentId, AppointmentOperator } from "../domain/appointment";
import { BadRequestError, NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repository/appointment";

export type PickAppointmentCommandParams = {
  id: AppointmentId;
  operator: AppointmentOperator;
};

export class PickAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ id, operator }: PickAppointmentCommandParams): Promise<void> {
    const appointment = await this.repository.findOne(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    if (appointment.operator) {
      throw new BadRequestError("Appointment has been already picked up");
    }

    appointment.pick(operator);

    await this.repository.update(appointment);
  }
}
