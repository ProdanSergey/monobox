import { Document, model, Schema, Types } from "mongoose";
import { Doctor } from "./doctor.model";

const MODEL = "Appointment";

export interface IAppointment extends Document {
	userId: string;
	startAt: string;
	doctor: Types.ObjectId;
}

const schema = new Schema<IAppointment>({
	userId: {
		type: String,
		required: true,
	},
	startAt: {
		type: String,
		required: true,
	},
	doctor: { type: Schema.Types.ObjectId, ref: Doctor },
});

console.log(schema);

export const Appointment = model<IAppointment>(MODEL, schema);
