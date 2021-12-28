import { Entity } from "../services/entity.service";
import { Facility } from "./facility.entity";

export enum DoctorSpecialty {
	SURGEON = 1,
	THERAPIST = 2,
	DENTIST = 3
}

export class Doctor extends Entity {
	firstName?: string;
	lastName?: string;
	specialty?: DoctorSpecialty;
	facility?: Facility;
}