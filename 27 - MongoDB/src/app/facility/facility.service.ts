
import { IFacility, Facility } from "../../models/facility.model";

export class FacilityService {
	async create(name: string): Promise<IFacility> {
		const facility = new Facility({
			name
		});

		return facility.save();
	}
};