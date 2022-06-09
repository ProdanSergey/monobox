import { Store } from "../ports/store";
import { AppointmentId } from "../domain/appointment";
import { NotFoundError } from "../domain/error";

export type DeleteAppointmentCommandParams = {
  id: AppointmentId;
};

export class DeleteAppointmentCommand {
  constructor(private readonly store: Store) {}

  execute({ id }: DeleteAppointmentCommandParams): void {
    if (!this.store.has(id)) {
      throw new NotFoundError();
    }

    this.store.delete(id);
  }
}
