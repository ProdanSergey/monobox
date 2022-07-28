import { AppointmentId } from "../domain/appointment";
import { Session } from "../domain/session";
import { SessionRepository } from "../ports/repository/session";

type CreateSessionCommandParams = {
  appointmentId: AppointmentId;
};

export class CreateSessionCommand {
  constructor(private readonly repository: SessionRepository) {}

  async execute({ appointmentId }: CreateSessionCommandParams): Promise<Session> {
    return await this.repository.create(Session.create({ appointmentId }));
  }
}
