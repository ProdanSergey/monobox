import { ConsoleLogger } from "@monobox/appointment-core";

import { AppointmentFile } from "./adapters/filesystem/appointment-file";
import { FileAppointmentRepository } from "./adapters/filesystem/appointment-repository";
import { NodeCLI } from "./adapters/node-cli";
import { AppointmentController } from "./app/appointment/controller";

const bootstrap = async () => {
  const logger = new ConsoleLogger();
  const nodeCli = new NodeCLI(logger);
  const appointmentFile = await AppointmentFile.initStore();
  const appointmentRepository = new FileAppointmentRepository(appointmentFile);

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : (error as string);
    const type = error instanceof Error ? error.name : undefined;

    logger.alert(message, type);
    process.exit(1);
  };

  process.on("uncaughtException", handleError);
  process.on("unhandledRejection", handleError);

  await new AppointmentController(nodeCli, logger, appointmentRepository).process();
};

bootstrap();
