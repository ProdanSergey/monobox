import type { Request, Response } from "express";
import { BaseController, route } from "../../infra/express";
import { Appointment, AppointmentRecord } from "../../domain/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import {
  AppointmentDeleteParams,
  AppointmentGetParams,
  AppointmentListQuery,
  AppointmentUpdateBody,
  appointmentUpdateBodySchema,
  AppointmentUpdateParams,
} from "./definition";
import { UpdateAppointmentCommand, UpdateAppointmentCommandParams } from "../../commands/UpdateAppointmentCommand";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
export class AppointmentController extends BaseController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    super();

    this.router.get("/", route(this.handleList));
    this.router.get("/:id", route(this.handleGet));
    this.router.post("/", route(this.handleCreate));
    this.router.put("/:id", route(this.handleUpdate, appointmentUpdateBodySchema));
    this.router.delete("/:id", route(this.handleDelete));
  }

  handleCreate = async (_req: Request, res: Response) => {
    const response = await new CreateAppointmentCommand(this.appointmentRepository).execute();

    res.status(201);

    return Appointment.toRecord(response);
  };

  handleGet = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const response = await new GetAppointmentCommand(this.appointmentRepository).execute({ id });

    return Appointment.toRecord(response);
  };

  handleUpdate = async (req: Request<AppointmentUpdateParams, AppointmentRecord, AppointmentUpdateBody>) => {
    const { id } = req.params;
    const { completed } = req.body;

    const command: UpdateAppointmentCommandParams = { id, completed };

    const response = await new UpdateAppointmentCommand(this.appointmentRepository).execute(command);

    return Appointment.toRecord(response);
  };

  handleDelete = async (req: Request<AppointmentDeleteParams, unknown>, res: Response) => {
    const { id } = req.params;

    await new DeleteAppointmentCommand(this.appointmentRepository).execute({ id });

    res.status(204);
  };

  handleList = async (req: Request<unknown, AppointmentRecord[], unknown, AppointmentListQuery>) => {
    const { completed, limit } = req.query;

    const response = await new ListAppointmentCommand(this.appointmentRepository).execute({ completed, limit });

    return response.map(Appointment.toRecord);
  };
}
