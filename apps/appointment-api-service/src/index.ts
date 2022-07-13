import * as dotenv from "dotenv";

dotenv.config();

import * as express from "express";
import * as cors from "cors";

import { errorHandling } from "@monobox/infra";

import { queryParser } from "express-query-parser";

import { connect } from "./infra/mongo";

import { ConsoleLogger } from "./adapters/console-logger";
import { MongoDBAppointmentRepository } from "./adapters/mongo/appointment-repository";

import { AppointmentController } from "./app/appointment/controller";

const { PORT } = process.env;

const bootstrap = async (app: express.Express) => {
  const logger = new ConsoleLogger();

  await connect();

  logger.print("DB Connected");

  app.use(
    cors({
      origin: function (origin, callback) {
        if (origin?.includes("localhost")) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Accept", "Content-Type"],
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

  app.use("/appointment", new AppointmentController(new MongoDBAppointmentRepository()).process());

  app.use(errorHandling);

  app.listen(PORT, () => {
    logger.print(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());
