import { model, Schema } from "mongoose";
import { AppointmentRecord } from "../../../domain/appointment";

const ENTITY = "Appointment";

export type AppointmentDocument = Omit<AppointmentRecord, "id">;

const schema = new Schema<AppointmentDocument>(
  {
    ticket: {
      type: String,
      required: true,
    },
    assignee: {
      type: { fullName: String, email: String },
      required: true,
      _id: false,
    },
    operator: {
      type: { fullName: String, email: String },
      required: false,
      _id: false,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const AppointmentEntity = model<AppointmentDocument>(ENTITY, schema);
