import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { ValidationError } from "../domain/error";
import { mapToInput, mapToStatusQuery } from "../mappers";

export type UpdateStatusInput = {
  id: string,
  completed: boolean
}

export class UpdateStatusCommand implements Command {
  constructor(
    private readonly input: UpdateStatusInput,
    private readonly todoService: TodoService, 
    private readonly logger: Logger
  ) {};

  async execute(): Promise<void> {
    const { id, completed } = this.input;

    const item = await this.todoService.update(id, { completed });

		this.logger.withContext(item).notify(`Item[${id}] complete: "${completed}"`);
  }
};

export const mapToUpdateStatusCommandInput = (input: string): UpdateStatusInput => {
  const { value, query } = mapToInput(input);

  if (!value) {
    throw new ValidationError('"value" must be type of string, not empty');
  }

  const { status } = mapToStatusQuery(query.status);
  
  return { id: value, completed: status ?? true };
}
