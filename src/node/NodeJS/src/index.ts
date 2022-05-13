import { InternalError } from "./utils/error.util";
import { Logger } from "./utils/logger.util";
import { TodoController } from "./app/todo/todo.controller";

const bootstrap = () => {
	const logger = new Logger();

	const handleError = (err: Error = new InternalError()) => {
		logger.throw(err);

		process.exit(1);
	};

	process.on("uncaughtException", handleError);
	process.on("unhandledRejection", handleError);

	const [argv] = process.argv.slice(2);

	new TodoController(argv);
};

bootstrap();
