import * as dotenv from "dotenv";
import * as express from "express";

import { queryParser } from "express-query-parser";

dotenv.config();

import { InMemoryAppointmentRepository } from "./adapters/cache/appointment-repository";
import { errorHandlingMiddleware } from "./middlewares/error-handling";

import { AppointmentController } from "./app/appointment/controller";
import { ConsoleLogger } from "./adapters/console-logger";

const { PORT } = process.env;

const bootstrap = (app: express.Express) => {
  const logger = new ConsoleLogger();

  app.use(express.json());

  app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true,
    })
  );

  app.use("/appointment", new AppointmentController(new InMemoryAppointmentRepository()).process());

  app.use(errorHandlingMiddleware);

  app.listen(PORT, () => {
    logger.print(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());
