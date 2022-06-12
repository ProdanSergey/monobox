import { Document, model, Schema } from "mongoose";
import { AppointmentRecord, AppointmentId } from "../../../domain/appointment";

const ENTITY = "Appointment";

export type AppointmentDocument = AppointmentRecord & Document<AppointmentId>;

const schema = new Schema<AppointmentDocument>(
  {
    _id: String,
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
