import { isUndefined } from "lodash";
import { Appointment, AppointmentId } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { AppointmentRepository } from "../../ports/repository/appointment";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  store: Map<AppointmentId, Appointment>;

  constructor() {
    this.store = new Map();
  }

  async create(appointment: Appointment): Promise<Appointment> {
    this.store.set(appointment.id, appointment);

    return appointment;
  }
  async update(appointment: Appointment): Promise<Appointment> {
    if (!this.store.has(appointment.id)) {
      throw new NotFoundError();
    }

    this.store.set(appointment.id, appointment);

    return appointment;
  }
  async findOne(id: AppointmentId): Promise<Appointment | undefined> {
    return this.store.get(id);
  }
  async findMany({ completed, limit }: { completed?: boolean; limit?: number }): Promise<Appointment[]> {
    let appointments = Array.from(this.store.values());

    if (!isUndefined(completed)) {
      appointments = appointments.filter((entity) => entity.completed === completed);
    }

    if (!isUndefined(limit) && isFinite(limit)) {
      appointments = appointments.slice(0, limit);
    }

    return appointments;
  }
  async remove(id: string): Promise<void> {
    if (!this.store.has(id)) {
      throw new NotFoundError();
    }

    this.store.delete(id);
  }
}
