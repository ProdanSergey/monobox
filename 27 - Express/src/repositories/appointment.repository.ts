import { Appointment } from "../entities/appointment.entity";
import { Repository } from "../services/repository.service";

export class AppointmentRepository extends Repository<Appointment> {
	constructor() {
		super('appointments')
	}
}