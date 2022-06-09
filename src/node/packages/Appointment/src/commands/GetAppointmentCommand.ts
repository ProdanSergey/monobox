import { NotFoundError } from "../domain/error";
import { Logger } from "../ports/logger";
import { Store } from "../ports/store";

type GetAppointmentCommandParams = {
  id: string;
};

export class GetAppointmentCommand {
  constructor(private readonly logger: Logger, private readonly store: Store) {}

  async execute({ id }: GetAppointmentCommandParams) {
    const state = await this.store.getState();

    const appointment = state[id];

    if (!appointment) {
      throw new NotFoundError();
    }

    this.logger.print(`[${id}]: ${appointment.created_at}`);
  }
}
