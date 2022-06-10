import { Store } from "../ports/store";
import { Appointment, AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";

export type UpdateAppointmentCommandParams = {
  id: AppointmentId;
  completed: boolean;
};

export class UpdateAppointmentCommand {
  constructor(private readonly store: Store) {}

  async execute({ id, completed }: UpdateAppointmentCommandParams): Promise<Appointment> {
    const state = await this.store.getState();

    if (!state[id]) {
      throw new NotFoundError();
    }

    const appointment = Appointment.toModel(state[id]);

    appointment.update({ completed });

    await this.store.setState(state);

    return appointment;
  }
}
