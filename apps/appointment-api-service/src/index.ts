import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { queryParser } from "express-query-parser";

import { ConsoleLogger, FakeMailer } from "@monobox/appointment-core";
import { errorHandling } from "@monobox/infra";

import { connect } from "./infra/mongo";
import { MongoDBAppointmentRepository } from "./adapters/mongo/appointment-repository";
import { AppointmentController } from "./app/appointment/controller";
import { MongoDBSessionRepository } from "./adapters/mongo/session-repository";

const { PORT } = process.env;

const bootstrap = async (app: express.Express) => {
  const logger = new ConsoleLogger();

  await connect();

  logger.print("DB Connected");

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Accept", "Content-Type", "X-Auth-Token", "X-User-Token"],
    })
  );

  app.use(express.json());

  app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true,
    })
  );

  const appointmentRepository = new MongoDBAppointmentRepository();
  const sessionRepository = new MongoDBSessionRepository();
  const mailer = new FakeMailer(logger);

  app.use("/appointment", new AppointmentController(appointmentRepository, sessionRepository, mailer).process());

  app.use(errorHandling);

  app.listen(PORT, () => {
    logger.print(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());
