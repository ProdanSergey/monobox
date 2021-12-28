import { Doctor } from "../entities/doctor.entity";
import { Repository } from "../services/repository.service";

export class DoctorRepository extends Repository<Doctor> {
	constructor() {
		super('doctors')
	}
}