import * as express from "express";
import type { Request, Response } from "express";
import { AppointmentService } from "./appointment.service";
import {
	AppointmentDTO,
	AppointmentsParams,
	AppointmentParams,
} from "./appointment.definition";
import { UnauthorizedError } from "../../definitions/error.definition";

const appointments = express.Router({ mergeParams: true });

const appointmentService = new AppointmentService();

appointments.post(
	"/",
	(
		req: Request<AppointmentsParams, unknown, AppointmentDTO>,
		res: Response
	) => {
		const userId = req.user;

		if (!userId) {
			throw new UnauthorizedError();
		}

		const { facilityId, doctorId } = req.params;
		const { startAt } = req.body;

		const response = appointmentService.create(
			userId,
			facilityId,
			doctorId,
			startAt
		);

		res.json(response);
	}
);

appointments.put(
	"/:appointmentId",
	(req: Request<AppointmentParams, any, AppointmentDTO>, res: Response) => {
		const userId = req.user;

		if (!userId) {
			throw new UnauthorizedError();
		}

		const { facilityId, doctorId, appointmentId } = req.params;
		const { startAt } = req.body;

		const response = appointmentService.update(
			userId,
			facilityId,
			doctorId,
			appointmentId,
			startAt
		);

		res.json(response);
	}
);

appointments.delete(
	"/:appointmentId",
	(req: Request<AppointmentParams>, res: Response) => {
		const userId = req.user;

		if (!userId) {
			throw new UnauthorizedError();
		}

		const { facilityId, doctorId, appointmentId } = req.params;

		appointmentService.delete(userId, facilityId, doctorId, appointmentId);

		res.sendStatus(204);
	}
);

appointments.get(
	"/:appointmentId",
	(req: Request<AppointmentParams>, res: Response) => {
		const userId = req.user;

		if (!userId) {
			throw new UnauthorizedError();
		}

		const { facilityId, doctorId, appointmentId } = req.params;

		const response = appointmentService.find(
			userId,
			facilityId,
			doctorId,
			appointmentId
		);

		res.json(response);
	}
);

appointments.get(
	"/",
	function (req: Request<AppointmentsParams>, res: Response) {
		const userId = req.user;

		if (!userId) {
			throw new UnauthorizedError();
		}

		const { facilityId, doctorId } = req.params;

		const response = appointmentService.list(userId, facilityId, doctorId);

		res.json(response);
	}
);

export { appointments };
