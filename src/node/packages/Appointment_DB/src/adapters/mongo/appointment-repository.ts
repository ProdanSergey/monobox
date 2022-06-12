import { AppointmentDocument, AppointmentEntity } from "../../infra/mongo/entities/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { Appointment } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { isUndefined } from "lodash";
import { FilterQuery } from "mongoose";

export class MongoDBAppointmentRepository implements AppointmentRepository {
  async create(appointment: Appointment): Promise<Appointment> {
    const record = await AppointmentEntity.create(Appointment.toRecord(appointment));

    return Appointment.toModel(record.toObject());
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const record = await AppointmentEntity.findByIdAndUpdate(appointment.id, Appointment.toRecord(appointment), {
      new: true,
    }).exec();

    if (!record) {
      throw new NotFoundError();
    }

    return Appointment.toModel(record.toObject());
  }

  async findOne(id: string): Promise<Appointment | undefined> {
    const record = await AppointmentEntity.findById(id).exec();

    if (!record) {
      return undefined;
    }

    return Appointment.toModel(record.toObject());
  }

  async findMany({ completed, limit = 100 }: { completed?: boolean; limit?: number }): Promise<Appointment[]> {
    const filter: FilterQuery<AppointmentDocument> = {};

    if (!isUndefined(completed)) {
      filter.completed = completed;
    }

    const records = await AppointmentEntity.find(filter).limit(limit).exec();

    return records.map((record) => Appointment.toModel(record.toObject()));
  }

  async remove(id: string): Promise<void> {
    const record = await AppointmentEntity.findByIdAndDelete(id).exec();

    if (!record) {
      throw new NotFoundError();
    }
  }
}
