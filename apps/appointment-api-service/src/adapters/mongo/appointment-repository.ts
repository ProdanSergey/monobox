import { isUndefined } from "lodash";
import { Document, FilterQuery, Types } from "mongoose";

import { NotFoundError } from "@monobox/infra";

import { AppointmentDocument, AppointmentEntity } from "../../infra/mongo/entities/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { Appointment, AppointmentRecord } from "../../domain/appointment";

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
  async create(record: Partial<AppointmentRecord>): Promise<Appointment> {
    const document = await AppointmentEntity.create(record);

    return mapDocumentToAppointment(document);
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const document = await AppointmentEntity.findByIdAndUpdate(appointment.id, mapAppointmentToDocument(appointment), {
      new: true,
    }).exec();

    if (!document) {
      throw new NotFoundError();
    }

    return mapDocumentToAppointment(document);
  }

  async findOne(id: string): Promise<Appointment | undefined> {
    const document = await AppointmentEntity.findById(id).exec();

    if (!document) {
      return undefined;
    }

    return mapDocumentToAppointment(document);
  }

  async findMany({ completed, limit = 100 }: { completed?: boolean; limit?: number }): Promise<Appointment[]> {
    const filter: FilterQuery<AppointmentDocument> = {};

    if (!isUndefined(completed)) {
      filter.completed = completed;
    }

    const documents = await AppointmentEntity.find(filter).limit(limit).exec();

    return documents.map(mapDocumentToAppointment);
  }

  async remove(id: string): Promise<void> {
    const document = await AppointmentEntity.findByIdAndDelete(id).exec();

    if (!document) {
      throw new NotFoundError();
    }
  }
}
