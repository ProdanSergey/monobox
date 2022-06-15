import { AppointmentDocument, AppointmentEntity } from "../../infra/mongo/entities/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { Appointment } from "../../domain/appointment";
import { NotFoundError } from "../../domain/error";
import { isUndefined } from "lodash";
import { Document, FilterQuery, Types } from "mongoose";

const mapAppointmentToDocument = (appointment: Appointment): { _id: Types.ObjectId } & AppointmentDocument => {
  const { id, ...record } = Appointment.toRecord(appointment);

  return {
    _id: new Types.ObjectId(id),
    ...record,
  };
};

const mapDocumentToAppointment = (document: Document<Types.ObjectId, unknown, AppointmentDocument>): Appointment => {
  const { _id, ...record } = document.toObject();

  return Appointment.toModel({
    id: String(_id),
    ...record,
  });
};

export class MongoDBAppointmentRepository implements AppointmentRepository {
  async create(appointment: Appointment): Promise<Appointment> {
    const record = await AppointmentEntity.create(mapAppointmentToDocument(appointment));

    return mapDocumentToAppointment(record);
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const record = await AppointmentEntity.findByIdAndUpdate(appointment.id, mapAppointmentToDocument(appointment), {
      new: true,
    }).exec();

    if (!record) {
      throw new NotFoundError();
    }

    return mapDocumentToAppointment(record);
  }

  async findOne(id: string): Promise<Appointment | undefined> {
    const record = await AppointmentEntity.findById(id).exec();

    if (!record) {
      return undefined;
    }

    return mapDocumentToAppointment(record);
  }

  async findMany({ completed, limit = 100 }: { completed?: boolean; limit?: number }): Promise<Appointment[]> {
    const filter: FilterQuery<AppointmentDocument> = {};

    if (!isUndefined(completed)) {
      filter.completed = completed;
    }

    const records = await AppointmentEntity.find(filter).limit(limit).exec();

    return records.map(mapDocumentToAppointment);
  }

  async remove(id: string): Promise<void> {
    const record = await AppointmentEntity.findByIdAndDelete(id).exec();

    if (!record) {
      throw new NotFoundError();
    }
  }
}
