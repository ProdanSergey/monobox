import { TodoController } from './todo/todo.controller';

export const App = class App {
	constructor() {
		this.handleExceptions();
	}

	listen(argv: string): void {
		new TodoController(argv).handle();
	}

	handleExceptions(): void {
		process.on('uncaughtException', ({ message }) => {
			console.log(`[${new Date().toTimeString()}]`, message);

			process.exit(1);
		});

		process.on('unhandledRejection', (reason: string) => {
			throw new Error(reason);
		});
	}
}