import { Document, model, Schema, Types } from "mongoose";
import { Facility } from "./facility.model";

const MODEL = 'Doctor';

export interface IDoctor extends Document {
	firstName: string,
	lastName: string,
	specialty: DoctorSpecialty,
	facility: Types.ObjectId
}

export enum DoctorSpecialty {
	SURGEON = 1,
	THERAPIST = 2,
	DENTIST = 3
}

const schema = new Schema<IDoctor>({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	specialty: {
		type: Number,
		enum: [1, 2, 3],
		required: true
	},
	facility: { type: Schema.Types.ObjectId, ref: Facility }
});

export const Doctor = model<IDoctor>(MODEL, schema);