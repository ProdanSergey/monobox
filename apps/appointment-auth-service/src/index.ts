import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { ConsoleLogger, FakeMailer } from "@monobox/appointment-core";
import { errorHandling } from "@monobox/infra/dist/express/middlewares";

import { connect } from "./infra/mongo";
import { MongoDBOperatorRepository } from "./adapters/mongo/operator-repository";
import { MongoDBOtpRepository } from "./adapters/mongo/otp-repository";
import { AuthorizationController } from "./app/authorization/controller";

const bootstrap = async (app: express.Express) => {
  const logger = new ConsoleLogger();

  await connect();

  logger.print("DB Connected");

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Accept", "Content-Type"],
    })
  );

  app.use(express.json());

  const operatorRepository = new MongoDBOperatorRepository();
  const otpRepository = new MongoDBOtpRepository();
  const mailer = new FakeMailer(logger);

  app.use("/authorization", new AuthorizationController(operatorRepository, otpRepository, mailer).process());

  app.use(errorHandling);

  const { PORT } = process.env;

  app.listen(PORT, () => {
    logger.print(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());
