import { Appointment, AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repository/appointment";

export type UpdateAppointmentCommandParams = {
  id: AppointmentId;
  completed: boolean;
};

export class UpdateAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ id, completed }: UpdateAppointmentCommandParams): Promise<Appointment> {
    const appointment = await this.repository.findOne(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    appointment.update({ completed });

    return this.repository.update(appointment);
  }
}
