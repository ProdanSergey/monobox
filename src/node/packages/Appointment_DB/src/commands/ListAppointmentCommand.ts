import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../ports/repository/appointment";

export type ListAppointmentCommandParams = {
  completed?: boolean;
  limit?: number;
};

export class ListAppointmentCommand {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute({ completed, limit }: ListAppointmentCommandParams): Promise<Appointment[]> {
    return await this.repository.findMany({ completed, limit });
  }
}
