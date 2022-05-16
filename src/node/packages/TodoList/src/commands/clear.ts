import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";

export class ClearCommand implements Command {
  constructor(
    private readonly todoService: TodoService, 
    private readonly logger: Logger
  ) {};

  async execute(): Promise<void> {
    await this.todoService.clear();
		
    this.logger.notify("All Items deleted");
  }
};