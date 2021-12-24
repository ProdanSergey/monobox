import { InternalError } from '../utils/error.util';
import { Logger } from '../utils/logger.util';
import { TodoController } from './todo/todo.controller';

export const App = class App {
	constructor(
		private readonly logger = new Logger()
	) {
		this.catch();
	}

	listen(argv: string): void {
		new TodoController(argv);
	}

	catch(): void {
		process.on('uncaughtException', (e) => this.handleError(e));
		process.on('unhandledRejection', () => this.handleError());
	}

	handleError(err: Error = new InternalError()) {
		this.logger.throw(err);

		process.exit(1);
	}
}