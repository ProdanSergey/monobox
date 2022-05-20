import { DoctorSpecialty } from "../../models/doctor.model";

export interface DoctorParams {
  facilityId: string;
}

export interface DoctorCreateDTO {
  firstName: string;
  lastName: string;
  specialty: DoctorSpecialty;
}
