import { model, Schema } from "mongoose";
import { OperatorRecord } from "../../../domain/operator";

const ENTITY = "Operator";

export type OperatorDocument = Omit<OperatorRecord, "id">;

const schema = new Schema<OperatorDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const OperatorEntity = model<OperatorDocument>(ENTITY, schema);
