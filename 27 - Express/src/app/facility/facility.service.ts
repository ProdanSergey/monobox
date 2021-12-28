
import { Facility } from "../../entities/facility.entity";
import { FacilityRepository } from "../../repositories/facility.repository";

export class FacilityService {
	constructor(
		private readonly facilityRepository = new FacilityRepository()
	) {}

	create(name: string): Facility {
		const facility = new Facility();

		facility.name = name;

		return this.facilityRepository.insert(facility);
	}
};