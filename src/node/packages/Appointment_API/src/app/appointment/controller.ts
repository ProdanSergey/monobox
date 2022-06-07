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
  appointmentUpdateBodySchema,
  AppointmentUpdateParams,
} from "./definition";
import { route } from "../../infra/route";

export class AppointmentController extends BaseController {
  private readonly appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    super(Router({ mergeParams: true }));

    this.appointmentService = appointmentService;

    this.router.get("/", route(this.handleList));
    this.router.get("/:id", route(this.handleGet));
    this.router.post("/", route(this.handleCreate));
    this.router.put("/:id", route(this.handleUpdate, appointmentUpdateBodySchema));
    this.router.delete("/:id", route(this.handleDelete));
  }

  handleCreate = async (_req: Request, res: Response) => {
    const response = this.appointmentService.create();

    res.status(201);

    return Appointment.toRecord(response);
  };

  handleGet = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const response = this.appointmentService.findOne(id);

    return Appointment.toRecord(response);
  };

  handleUpdate = async (req: Request<AppointmentUpdateParams, AppointmentRecord, AppointmentUpdateBody>) => {
    const { id } = req.params;
    const { completed } = req.body;

    const response = this.appointmentService.update(id, { completed });

    return Appointment.toRecord(response);
  };

  handleDelete = async (req: Request<AppointmentDeleteParams, never>, res: Response) => {
    const { id } = req.params;

    this.appointmentService.delete(id);

    res.status(204);
  };

  handleList = async (req: Request<never, AppointmentRecord[], never, AppointmentListQuery>) => {
    const { completed, limit } = req.query;

    const response = this.appointmentService.findMany({ completed, limit });

    return response.map((appointment) => Appointment.toRecord(appointment));
  };
}
