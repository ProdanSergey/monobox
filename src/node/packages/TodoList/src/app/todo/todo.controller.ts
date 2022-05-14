import { BadRequestError, InternalError } from "../../utils/error";
import { Logger } from "../../utils/logger";
import { TodoService } from "./todo.service";

interface Command {
  execute(): void
}

class CreateCommand implements Command {
  constructor(
    private readonly argv: string[], 
    private readonly logger: Logger
  ) {}
  
  execute(): void {
    
  }


};

class ListCommand implements Command {
  execute(argv: string[], logger: Logger): void {
    throw new Error("Method not implemented.");
  }

};

class GetCommand implements Command {
  execute(argv: string[], logger: Logger): void {
    throw new Error("Method not implemented.");
  }

};

class ChangeStatusCommand implements Command {
  execute(argv: string[], logger: Logger): void {
    throw new Error("Method not implemented.");
  }

};

class UpdateCommand implements Command {
  execute(argv: string[], logger: Logger): void {
    throw new Error("Method not implemented.");
  }

};


export const TodoController = class TodoController {
	constructor(
		private readonly argv: string[],
		private readonly logger = new Logger(),
		private readonly todoService = new TodoService()
	) {
		this.handle();
	}

  private parse(): [any, any] {
    return this.arg.split("=");
  }

	async handle(): Promise<void> {
		try {
			if (!this.arg) {
				throw new InternalError();
			}

			const [action, value] = this.parse();

			switch (method) {
				case "set":
					await this.handleSet(option, value);
					break;
				case "get":
					await this.handleGet(option, value);
					break;
				case "add":
					await this.handleAdd(value);
					break;
				case "delete":
					await this.handleDelete(option);
					break;
				default:
					throw new BadRequestError();
			}
		} catch (error) {
			this.logger.throw(error as Error);
		}
	}

  

	async handleSet(option: string, value: string): Promise<void> {
		switch (value) {
			case "true": {
				await this.todoService.set(option, true);

				this.logger.notify("Todo item is now completed");
				break;
			}
			case "false": {
				await this.todoService.set(option, false);

				this.logger.notify("Todo item is now uncompleted");
				break;
			}
			default: {
				await this.todoService.set(option, value);

				this.logger.notify("Todo item is successfully updated");
				break;
			}
		}
	}

	async handleGet(option: string, value: string): Promise<void> {
		switch (option) {
			case "!": {
				const todos = await this.todoService.getAll();

				this.logger.notify("All todo items:", todos);
				break;
			}
			case "+": {
				const todos = await this.todoService.getAll(true);

				this.logger.notify("Completed todo items:", todos);
				break;
			}
			case "-": {
				const todos = await this.todoService.getAll(false);

				this.logger.notify("Uncompleted todo items", todos);
				break;
			}
			case "^": {
				const todos = await this.todoService.search(value);

				this.logger.notify("Search result", todos);
				break;
			}
			default: {
				const todo = await this.todoService.get(option);

				this.logger.notify("Result:", todo);
				break;
			}
		}
	}

	async handleAdd(value: string): Promise<void> {
		await this.todoService.add(value);

		this.logger.notify("Todo item is successfully added");
	}

	async handleDelete(option: string): Promise<void> {
		switch (option) {
			case "!":
				await this.todoService.clear();

				this.logger.notify("Todo list is successfully cleared");
				break;
			default: {
				await this.todoService.remove(option);

				this.logger.notify("Todo item is successfully removed");
				break;
			}
		}
	}
};
