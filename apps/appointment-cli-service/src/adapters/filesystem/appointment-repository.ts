import { isUndefined } from "@monobox/utils";
import { Appointment } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { File } from "../../ports/file";
import { AppointmentRepository } from "../../ports/repository/appointment";

export class FileAppointmentRepository implements AppointmentRepository {
  constructor(private readonly file: File<Appointment>) {}

  async create(appointment: Appointment): Promise<Appointment> {
    const state = await this.file.getState();

    await this.file.setState({ ...state, [appointment.id]: appointment });

    return appointment;
  }
  async update(appointment: Appointment): Promise<Appointment> {
    const state = await this.file.getState();

    const record = state[appointment.id];

    if (!record) {
      throw new NotFoundError();
    }

    const recordModel = Appointment.toModel(record);

    recordModel.update(appointment);

    await this.file.setState({ ...state, [recordModel.id]: recordModel });

    return recordModel;
  }
  async findOne(id: string): Promise<Appointment | undefined> {
    const state = await this.file.getState();

    const record = state[id];

    return record;
  }
  async findMany({ completed, limit }: { completed?: boolean; limit?: number }): Promise<Appointment[]> {
    let records = Object.values(await this.file.getState());

    if (!isUndefined(completed)) {
      records = records.filter((record) => record.completed === completed);
    }

    if (!isUndefined(limit) && isFinite(limit)) {
      records = records.slice(0, limit);
    }

    return records;
  }
  async remove(id: string): Promise<void> {
    const state = await this.file.getState();

    const { [id]: record, ...nextState } = state;

    if (!record) {
      throw new NotFoundError();
    }

    await this.file.setState(nextState);
  }
}
