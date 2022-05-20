import * as express from "express";
import type { Request } from "express";
import { AppointmentService } from "./appointment.service";
import { AppointmentDTO, AppointmentsParams, AppointmentParams } from "./appointment.definition";
import { UnauthorizedError } from "../../definitions/error.definition";
import { withErrorHandler } from "../../decorators/error-handler.decorator";

const appointments = express.Router({ mergeParams: true });

const appointmentService = new AppointmentService();

appointments.post(
  "/",
  withErrorHandler<Request<AppointmentsParams, unknown, AppointmentDTO>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { facilityId, doctorId } = req.params;
    const { startAt } = req.body;

    const response = await appointmentService.create(userId, facilityId, doctorId, startAt);

    res.json(response);
  })
);

appointments.put(
  "/:appointmentId",
  withErrorHandler<Request<AppointmentParams, unknown, AppointmentDTO>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { facilityId, doctorId, appointmentId } = req.params;
    const { startAt } = req.body;

    const response = await appointmentService.update(userId, facilityId, doctorId, appointmentId, startAt);

    res.json(response);
  })
);

appointments.delete(
  "/:appointmentId",
  withErrorHandler<Request<AppointmentParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { facilityId, doctorId, appointmentId } = req.params;

    await appointmentService.delete(userId, facilityId, doctorId, appointmentId);

    res.sendStatus(204);
  })
);

appointments.get(
  "/:appointmentId",
  withErrorHandler<Request<AppointmentParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { facilityId, doctorId, appointmentId } = req.params;

    const response = await appointmentService.find(userId, facilityId, doctorId, appointmentId);

    res.json(response);
  })
);

appointments.get(
  "/",
  withErrorHandler<Request<AppointmentsParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { facilityId, doctorId } = req.params;

    const response = await appointmentService.list(userId, facilityId, doctorId);

    res.json(response);
  })
);

export { appointments };
