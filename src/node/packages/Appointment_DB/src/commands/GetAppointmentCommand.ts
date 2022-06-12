import { Appointment, AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repository/appointment";

type GetAppointmentCommandParams = {
  id: AppointmentId;
};

export class GetAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ id }: GetAppointmentCommandParams): Promise<Appointment> {
    const appointment = await this.repository.findOne(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }
}
