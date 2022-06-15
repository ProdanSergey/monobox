import type { Request, Response } from "express";
import { BaseController, route } from "../../infra/express";
import { Appointment, AppointmentRecord } from "../../domain/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import {
  AppointmentCompleteParams,
  AppointmentCreateBody,
  appointmentCreateBodySchema,
  AppointmentDeleteParams,
  AppointmentGetParams,
  AppointmentListQuery,
  AppointmentPickBody,
  appointmentPickBodySchema,
  AppointmentPickParams,
} from "./definition";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
import { PickAppointmentCommand } from "../../commands/PickAppointmentCommand";
import { CompleteAppointmentCommand } from "../../commands/CompleteAppointmentCommand";
export class AppointmentController extends BaseController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    super();

    this.router.get("/", route(this.handleList));
    this.router.get("/:id", route(this.handleGet));
    this.router.post("/", route(this.handleCreate, appointmentCreateBodySchema));
    this.router.delete("/:id", route(this.handleDelete));
    this.router.post("/:id/pick", route(this.handlePick, appointmentPickBodySchema));
    this.router.post("/:id/complete", route(this.handleComplete));
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
