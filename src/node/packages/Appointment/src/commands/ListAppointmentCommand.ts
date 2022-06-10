import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";
import { isUndefined } from "lodash";
import { DomainError } from "../domain/error";

export type ListAppointmentCommandParams = {
  completed?: boolean;
  limit?: number;
};

export class ListAppointmentCommand {
  constructor(private readonly store: Store) {}

  async execute({ completed, limit }: ListAppointmentCommandParams): Promise<Appointment[]> {
    let appointments = Object.values(await this.store.getState()).map(Appointment.toModel);

    if (!isUndefined(completed)) {
      appointments = appointments.filter((entity) => entity.completed === completed);
    }

    if (!isUndefined(limit) && isFinite(limit)) {
      appointments = appointments.slice(0, limit);
    }

    if (!appointments.length) {
      throw new DomainError("There are no appointments");
    }

    return appointments;
  }
}
