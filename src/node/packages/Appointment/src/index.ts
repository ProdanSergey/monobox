import { ConsoleLogger } from "./adapters/console-logger";
import { FileStore } from "./adapters/file-store";
import { AppointmentController } from "./app/appointment.controller";
import { AppointmentService } from "./app/appointment.service";

const bootstrap = async () => {
  const logger = new ConsoleLogger();
  const store = await FileStore.initStore();

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : (error as string);
    const type = error instanceof Error ? error.name : undefined;

    logger.throw(message, type);
    process.exit(1);
  };

  process.on("uncaughtException", handleError);
  process.on("unhandledRejection", handleError);

  const appointmentController = new AppointmentController(logger, new AppointmentService(store));

  await appointmentController.process(process.argv);
};

bootstrap();
