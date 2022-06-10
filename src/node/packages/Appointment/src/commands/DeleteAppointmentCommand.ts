import { Store } from "../ports/store";
import { AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";

export type DeleteAppointmentCommandParams = {
  id: AppointmentId;
};

export class DeleteAppointmentCommand {
  constructor(private readonly store: Store) {}

  async execute({ id }: DeleteAppointmentCommandParams): Promise<void> {
    const state = await this.store.getState();

    if (!state[id]) {
      throw new NotFoundError();
    }

    delete state[id];

    await this.store.setState(state);
  }
}
