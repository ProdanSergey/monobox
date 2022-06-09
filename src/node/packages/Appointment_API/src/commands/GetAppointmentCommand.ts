import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";

type GetAppointmentCommandParams = {
  id: string;
};

export class GetAppointmentCommand {
  constructor(private readonly store: Store) {}

  execute({ id }: GetAppointmentCommandParams): Appointment {
    const appointment = Array.from(this.store.values()).find((entity) => entity.id === id);

    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }
}
