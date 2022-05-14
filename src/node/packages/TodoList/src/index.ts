import { InternalError } from "./utils/error";
import { Logger } from "./utils/logger";
import { TodoController } from "./app/todo/todo.controller";

const bootstrap = () => {
	const logger = new Logger();

	const handleError = (err: Error = new InternalError()) => {
		logger.throw(err);

		process.exit(1);
	};

	process.on("uncaughtException", handleError);
	process.on("unhandledRejection", handleError);

	new TodoController(process.argv);
};

bootstrap();
