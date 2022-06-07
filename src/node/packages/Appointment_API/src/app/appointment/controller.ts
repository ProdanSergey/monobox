import { Router } from "express";
import type { Request, Response } from "express";
import { AppointmentService } from "./service";
import { BaseController } from "../../infra/controller";
import { Appointment, AppointmentRecord } from "../../domain/appointment";
import {
  AppointmentDeleteParams,
  AppointmentGetParams,
  AppointmentListQuery,
  AppointmentUpdateBody,
  AppointmentUpdateParams,
} from "./definition";

export class AppointmentController extends BaseController {
  private readonly appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    super(Router({ mergeParams: true }));

    this.appointmentService = appointmentService;

    this.router.get("/", this.handleList);
    this.router.get("/:id", this.handleGet);
    this.router.post("/", this.handleCreate);
    this.router.put("/:id", this.handleUpdate);
    this.router.delete("/:id", this.handleDelete);
  }

  handleCreate = (_req: Request<never, AppointmentRecord, never>, res: Response<AppointmentRecord>) => {
    const response = this.appointmentService.create();

    res.json(Appointment.toRecord(response));
  };

  handleGet = (req: Request<AppointmentGetParams, AppointmentRecord>, res: Response<AppointmentRecord>) => {
    const { id } = req.params;

    const response = this.appointmentService.findOne(id);

    res.json(Appointment.toRecord(response));
  };

  handleUpdate = (
    req: Request<AppointmentUpdateParams, AppointmentRecord, AppointmentUpdateBody>,
    res: Response<AppointmentRecord>
  ) => {
    const { id } = req.params;
    const { completed } = req.body;

    const response = this.appointmentService.update(id, { completed });

    res.json(Appointment.toRecord(response));
  };

  handleDelete = (req: Request<AppointmentDeleteParams, never>, res: Response<never>) => {
    const { id } = req.params;

    this.appointmentService.delete(id);

    res.status(204).end();
  };

  handleList = (
    req: Request<never, AppointmentRecord[], never, AppointmentListQuery>,
    res: Response<AppointmentRecord[]>
  ) => {
    const { completed, limit } = req.query;

    console.log(completed, limit);

    const response = this.appointmentService.findMany({ completed, limit });

    res.json(response.map((appointment) => Appointment.toRecord(appointment)));
  };
}
