import { AppointmentId } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repository/appointment";

export type DeleteAppointmentCommandParams = {
  id: AppointmentId;
};

export class DeleteAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ id }: DeleteAppointmentCommandParams): Promise<void> {
    await this.repository.remove(id);
  }
}
