import type { Request, Response } from "express";

import { BaseController, serialize, validate } from "@monobox/infra";

import {
  AppointmentCompleteParams,
  AppointmentCreateBody,
  AppointmentDeleteParams,
  AppointmentGetParams,
  AppointmentListQuery,
  AppointmentPickBody,
  AppointmentPickParams,
} from "@monobox/appointment-contract";

import { Appointment, AppointmentRecord } from "../../domain/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";

import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
import { PickAppointmentCommand } from "../../commands/PickAppointmentCommand";
import { CompleteAppointmentCommand } from "../../commands/CompleteAppointmentCommand";

import { appointmentCreateBodySchema, appointmentPickBodySchema } from "./definition";

export class AppointmentController extends BaseController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    super();

    this.router.get("/", serialize(this.handleList));
    this.router.get("/:id", serialize(this.handleGet));
    this.router.post("/", validate(appointmentCreateBodySchema), serialize(this.handleCreate));
    this.router.delete("/:id", serialize(this.handleDelete));
    this.router.post("/:id/pick", validate(appointmentPickBodySchema), serialize(this.handlePick));
    this.router.post("/:id/complete", serialize(this.handleComplete));
  }

  handleCreate = async (req: Request<unknown, AppointmentRecord, AppointmentCreateBody>, res: Response) => {
    const { fullName, email } = req.body;

    const response = await new CreateAppointmentCommand(this.appointmentRepository).execute({
      assignee: {
        fullName,
        email,
      },
    });

    res.status(201);

    return Appointment.toRecord(response);
  };

  handleGet = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const response = await new GetAppointmentCommand(this.appointmentRepository).execute({ id });

    return Appointment.toRecord(response);
  };

  handleDelete = async (req: Request<AppointmentDeleteParams>, res: Response) => {
    const { id } = req.params;

    await new DeleteAppointmentCommand(this.appointmentRepository).execute({ id });

    res.status(204);
  };

  handleList = async (req: Request<unknown, AppointmentRecord[], unknown, AppointmentListQuery>) => {
    const { completed, limit } = req.query;

    const response = await new ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit });

    return response.map(Appointment.toRecord);
  };

  handlePick = async (req: Request<AppointmentPickParams, unknown, AppointmentPickBody>) => {
    const { id } = req.params;
    const { fullName, email } = req.body;

    await new PickAppointmentCommand(this.appointmentRepository).execute({
      id,
      operator: {
        fullName,
        email,
      },
    });
  };

  handleComplete = async (req: Request<AppointmentCompleteParams>) => {
    const { id } = req.params;

    await new CompleteAppointmentCommand(this.appointmentRepository).execute({ id });
  };
}
