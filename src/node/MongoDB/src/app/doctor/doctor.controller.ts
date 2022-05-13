import * as express from "express";
import type { Request } from "express";
import { DoctorService } from "./doctor.service";
import { DoctorCreateDTO, DoctorParams } from "./doctor.definition";
import { withErrorHandler } from "../../decorators/error-handler.decorator";

const doctors = express.Router({ mergeParams: true });

const doctorService = new DoctorService();

doctors.post(
	"/",
	withErrorHandler<Request<DoctorParams, unknown, DoctorCreateDTO>>(
		async (req, res) => {
			const { facilityId } = req.params;
			const { firstName, lastName, specialty } = req.body;

			const response = await doctorService.create(
				firstName,
				lastName,
				specialty,
				facilityId
			);

			res.json(response);
		}
	)
);

doctors.get(
	"/",
	withErrorHandler<Request<DoctorParams>>(async (req, res) => {
		const { facilityId } = req.params;

		const response = await doctorService.list(facilityId);

		res.json(response);
	})
);

export { doctors };
