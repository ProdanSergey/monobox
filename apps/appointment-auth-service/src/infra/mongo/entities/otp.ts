import { model, Schema } from "mongoose";
import { OtpRecord } from "../../../domain/otp";

const ENTITY = "Otp";

export type OtpDocument = Omit<OtpRecord, "id">;

const schema = new Schema<OtpDocument>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    expire_at: {
      type: Date,
      default: Date.now,
      index: { expires: "1m" },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const OtpEntity = model<OtpDocument>(ENTITY, schema);
