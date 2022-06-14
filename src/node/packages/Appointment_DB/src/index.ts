import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";

import { queryParser } from "express-query-parser";

dotenv.config();

import { connect } from "./infra/mongo";
import { errorHandlingMiddleware } from "./middlewares/error-handling";

import { ConsoleLogger } from "./adapters/console-logger";
import { MongoDBAppointmentRepository } from "./adapters/mongo/appointment-repository";

import { AppointmentController } from "./app/appointment/controller";

const { PORT } = process.env;

const bootstrap = async (app: express.Express) => {
  const logger = new ConsoleLogger();

  await connect();

  logger.print("DB Connected");

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3030", "http://localhost:8080"],
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Accept", "Content-Type"],
    })
  );

  app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true,
    })
  );

  app.use("/appointment", new AppointmentController(new MongoDBAppointmentRepository()).process());

  app.use(errorHandlingMiddleware);

  app.listen(PORT, () => {
    logger.print(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());
