import { Document, model, Schema } from "mongoose";

const MODEL = "Facility";

export interface IFacility extends Document {
  name: string;
}

const schema = new Schema<IFacility>({
  name: {
    type: String,
    required: true,
  },
});

export const Facility = model<IFacility>(MODEL, schema);
