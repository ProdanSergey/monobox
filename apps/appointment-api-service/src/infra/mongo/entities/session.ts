import { model, Schema } from "mongoose";
import { SessionRecord } from "../../../domain/session";

const ENTITY = "Session";

export type SessionDocument = Omit<SessionRecord, "id">;

const schema = new Schema<SessionDocument>(
  {
    token: {
      type: String,
      required: true,
    },
    appointmentId: {
      type: String,
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

export const SessionEntity = model<SessionDocument>(ENTITY, schema);
