import { NotFoundError } from "../../definitions/error.definition";
import { IDoctor, Doctor, DoctorSpecialty } from "../../models/doctor.model";
import { Facility } from "../../models/facility.model";

export class DoctorService {
	async create(
		firstName: string,
		lastName: string,
		specialty: DoctorSpecialty,
		facilityId: string
	): Promise<IDoctor> {
		const facility = await Facility.findById(facilityId).exec();

		if (!facility) {
			throw new NotFoundError();
		}

		const doctor = new Doctor({
			firstName,
			lastName,
			specialty,
			facility,
		});

		return doctor.save();
	}

	async list(facilityId: string): Promise<IDoctor[]> {
		const facility = await Facility.findById(facilityId).exec();

		if (!facility) {
			throw new NotFoundError();
		}

		return await Doctor.find({ facility: facilityId })
			.populate("facility")
			.exec();
	}
}
