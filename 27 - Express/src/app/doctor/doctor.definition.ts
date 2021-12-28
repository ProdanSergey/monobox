import { DoctorSpecialty } from "../../entities/doctor.entity";

export interface DoctorCreateParams {
	facilityId: string;
}

export interface DoctorCreateDTO {
	firstName: string;
	lastName: string;
	specialty: DoctorSpecialty;
}