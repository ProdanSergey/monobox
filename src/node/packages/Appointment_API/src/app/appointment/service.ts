import { isUndefined } from "lodash";
import { store } from "../../../store";
import { NotFoundError } from "../../domain/error";
import { Appointment } from "../../domain/appointment";

export class AppointmentService {
  create(): Appointment {
    const appointment = Appointment.create();

    store.set(appointment.id, appointment);

    return appointment;
  }

  update(id: string, partial: Partial<Appointment>): Appointment {
    const appointment = store.get(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    appointment.update(partial);

    return appointment;
  }

  findOne(id: string): Appointment {
    const appointment = Array.from(store.values()).find((entity) => entity.id === id);

    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }

  findMany({ completed, limit }: Partial<{ completed: boolean; limit: number }>): Appointment[] {
    let appointments = Array.from(store.values());

    if (!isUndefined(completed)) {
      appointments = appointments.filter((entity) => entity.completed === completed);
    }

    if (!isUndefined(limit) && isFinite(limit)) {
      appointments = appointments.slice(0, limit);
    }

    return appointments;
  }

  delete(id: string): void {
    if (!store.has(id)) {
      throw new NotFoundError();
    }

    store.delete(id);
  }
}
