import { Doctor, DoctorSpecialty } from "../../entities/doctor.entity";
import { DoctorRepository } from "../../repositories/doctor.repository";
import { FacilityRepository } from "../../repositories/facility.repository";

export class DoctorService {
  constructor(
    private readonly doctorRepository = new DoctorRepository(),
    private readonly facilityRepository = new FacilityRepository()
  ) {}

  create(firstName: string, lastName: string, specialty: DoctorSpecialty, facilityId: string): Doctor {
    const facility = this.facilityRepository.findOneOrFail({ id: facilityId });

    const doctor = new Doctor();

    doctor.firstName = firstName;
    doctor.lastName = lastName;
    doctor.specialty = specialty;
    doctor.facility = facility;

    return this.doctorRepository.insert(doctor);
  }
}
