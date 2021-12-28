import { Entity } from "../services/entity.service";
import { Doctor } from "./doctor.entity";

export class Appointment extends Entity {
	userId?: string
	startAt?: string
	doctor?: Doctor
}