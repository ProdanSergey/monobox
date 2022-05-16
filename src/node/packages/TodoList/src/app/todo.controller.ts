import { Logger } from "../ports/logger";
import { BadRequestError } from "../domain/error";
import { mapToArguments, mapToCommand } from "../mappers";
import { CreateCommand, mapToCreateCommandInput } from "../commands/create";
import { GetCommand, mapToGetCommandInput } from "../commands/get";
import { mapToUpdateCommandInput, UpdateCommand } from "../commands/update";
import { DeleteCommand, mapToDeleteCommandInput } from "../commands/delete";
import { mapToUpdateStatusCommandInput, UpdateStatusCommand } from "../commands/update-status";
import { ListCommand, mapToListCommandInput } from "../commands/list";
import { TodoService } from "./todo.service";
import { ClearCommand } from "../commands/clear";

export const TodoController = class TodoController {
  constructor(private readonly todoService: TodoService, private readonly logger: Logger) {
		try {
      this.handle();
    } catch (error) {
			this.logger.throw(error as Error);
		}
	}
  
	async handle(): Promise<void> {
    const [commandArg, inputArg] = mapToArguments(process.argv);

    switch (mapToCommand(commandArg)) {
      case "create":
        return new CreateCommand(mapToCreateCommandInput(inputArg), this.todoService, this.logger).execute();
      case "get":
        return new GetCommand(mapToGetCommandInput(inputArg), this.todoService, this.logger).execute();
      case "update":
        return new UpdateCommand(mapToUpdateCommandInput(inputArg), this.todoService, this.logger).execute();
      case "delete":
        return new DeleteCommand(mapToDeleteCommandInput(inputArg), this.todoService, this.logger).execute();
      case "complete":
        return new UpdateStatusCommand(mapToUpdateStatusCommandInput(inputArg), this.todoService, this.logger).execute();
      case "list":
        return new ListCommand(mapToListCommandInput(inputArg), this.todoService, this.logger).execute();
      case "clear":
        return new ClearCommand(this.todoService, this.logger).execute();
      default:
        throw new BadRequestError();
    }
	}
};
