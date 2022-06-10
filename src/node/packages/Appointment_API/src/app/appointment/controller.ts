import type { Request, Response } from "express";
import { BaseController, route } from "../../infra/express";
import { Appointment, AppointmentRecord } from "../../domain/appointment";
import { Store } from "../../ports/store";
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
  constructor(private readonly store: Store) {
    super();

    this.router.get("/", route(this.handleList));
    this.router.get("/:id", route(this.handleGet));
    this.router.post("/", route(this.handleCreate));
    this.router.put("/:id", route(this.handleUpdate, appointmentUpdateBodySchema));
    this.router.delete("/:id", route(this.handleDelete));
  }

  handleCreate = async (_req: Request, res: Response) => {
    const response = new CreateAppointmentCommand(this.store).execute();

    res.status(201);

    return response;
  };

  handleGet = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const response = new GetAppointmentCommand(this.store).execute({ id });

    return Appointment.toRecord(response);
  };

  handleUpdate = async (req: Request<AppointmentUpdateParams, AppointmentRecord, AppointmentUpdateBody>) => {
    const { id } = req.params;
    const { completed } = req.body;

    const command: UpdateAppointmentCommandParams = { id, completed };

    const response = new UpdateAppointmentCommand(this.store).execute(command);

    return Appointment.toRecord(response);
  };

  handleDelete = async (req: Request<AppointmentDeleteParams, unknown>, res: Response) => {
    const { id } = req.params;

    new DeleteAppointmentCommand(this.store).execute({ id });

    res.status(204);
  };

  handleList = async (req: Request<unknown, AppointmentRecord[], unknown, AppointmentListQuery>) => {
    const { completed, limit } = req.query;

    const response = new ListAppointmentCommand(this.store).execute({ completed, limit });

    return response.map((appointment) => Appointment.toRecord(appointment));
  };
}
