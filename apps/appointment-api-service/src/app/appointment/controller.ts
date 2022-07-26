import type { Request, Response } from "express";

import { BaseController, serialize, UnauthorizedError, validate } from "@monobox/infra";

import {
  AppointmentCompleteParams,
  AppointmentCreateBody,
  AppointmentDeleteParams,
  AppointmentGetParams,
  AppointmentListQuery,
  AppointmentPickParams,
} from "@monobox/appointment-contract";

import { Appointment, AppointmentRecord } from "../../domain/appointment";
import { AppointmentRepository } from "../../ports/repository/appointment";
import { SessionRepository } from "../../ports/repository/session";
import { asAssignee, asOperator, Strategy } from "../../infra/express/middlewares/authenticate";

import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
import { PickAppointmentCommand } from "../../commands/PickAppointmentCommand";
import { CompleteAppointmentCommand } from "../../commands/CompleteAppointmentCommand";
import { CreateSessionCommand } from "../../commands/CreateSessionCommand";
import { SendAppointmentConfirmationEmailCommand } from "../../commands/SendAppointmentConfirmationEmailCommand";
import { FindUserSessionCommand } from "../../commands/FindUserSessionCommand";

import { appointmentCreateBodySchema } from "./definition";

export class AppointmentController extends BaseController {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly sessionRepository: SessionRepository
  ) {
    super();

    this.router.get("/", new Strategy(asOperator).next(), serialize(this.handleList));
    this.router.get("/:id", new Strategy(asAssignee).next("route"), serialize(this.handleGet));
    this.router.get("/:id", new Strategy(asOperator).next(), serialize(this.handleGetByOperator));
    this.router.post("/", validate(appointmentCreateBodySchema), serialize(this.handleCreate));
    this.router.delete("/:id", new Strategy(asOperator).next(), serialize(this.handleDelete));
    this.router.post("/:id/pick", new Strategy(asOperator).next(), serialize(this.handlePick));
    this.router.post("/:id/complete", new Strategy(asOperator).next(), serialize(this.handleComplete));
  }

  handleCreate = async (req: Request<unknown, AppointmentRecord, AppointmentCreateBody>, res: Response) => {
    const { fullName, email } = req.body;

    const response = await new CreateAppointmentCommand(this.appointmentRepository).execute({
      assignee: {
        fullName,
        email,
      },
    });

    const session = await new CreateSessionCommand(this.sessionRepository).execute({ appointmentId: response.id });

    new SendAppointmentConfirmationEmailCommand().execute({ token: session.token });

    res.status(201);

    return Appointment.toRecord(response);
  };

  handleGet = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const session = await new FindUserSessionCommand(this.sessionRepository).execute({ token: req.token! });

    if (session.appointmentId !== id) {
      throw new UnauthorizedError();
    }

    const response = await this.getAppointmentById(id);

    return Appointment.toRecord(response);
  };

  handleGetByOperator = async (req: Request<AppointmentGetParams, AppointmentRecord>) => {
    const { id } = req.params;

    const response = await this.getAppointmentById(id);

    return Appointment.toRecord(response);
  };

  private async getAppointmentById(id: string): Promise<Appointment> {
    return await new GetAppointmentCommand(this.appointmentRepository).execute({ id });
  }

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

  handlePick = async (req: Request<AppointmentPickParams>) => {
    const { id } = req.params;
    const { fullName, email } = req.operator!;

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
