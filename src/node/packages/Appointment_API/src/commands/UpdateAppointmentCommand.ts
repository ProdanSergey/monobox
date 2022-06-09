import { Store } from "../ports/store";
import { Appointment, AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";

export type UpdateAppointmentCommandParams = {
  id: AppointmentId;
  partial: Partial<Appointment>;
};

export class UpdateAppointmentCommand {
  constructor(private readonly store: Store) {}

  execute({ id, partial }: UpdateAppointmentCommandParams): Appointment {
    const appointment = this.store.get(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    appointment.update(partial);

    return appointment;
  }
}
