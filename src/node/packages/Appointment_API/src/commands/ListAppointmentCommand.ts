import { Store } from "../ports/store";
import { Appointment } from "../domain/appointment";
import { isUndefined } from "lodash";

export type ListAppointmentCommandParams = {
  completed?: boolean;
  limit?: number;
};

export class ListAppointmentCommand {
  constructor(private readonly store: Store) {}

  execute({ completed, limit }: ListAppointmentCommandParams): Appointment[] {
    let appointments = Array.from(this.store.values());

    if (!isUndefined(completed)) {
      appointments = appointments.filter((entity) => entity.completed === completed);
    }

    if (!isUndefined(limit) && isFinite(limit)) {
      appointments = appointments.slice(0, limit);
    }

    return appointments;
  }
}
