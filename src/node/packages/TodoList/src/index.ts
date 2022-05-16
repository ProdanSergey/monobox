import { InternalError } from "./domain/error";
import { ConsoleLogger } from "./adapters/console-logger";
import { TodoController } from "./app/todo.controller";
import { TodoService } from "./app/todo.service";

const bootstrap = () => {
	const logger = new ConsoleLogger()

	const handleError = (err: Error = new InternalError()) => {
		logger.throw(err);

		process.exit(1);
	};

	process.on("uncaughtException", handleError);
	process.on("unhandledRejection", handleError);

	new TodoController(new TodoService(), logger);
};

bootstrap();
