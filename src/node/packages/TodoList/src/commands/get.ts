import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { ValidationError } from "../domain/error";
import { mapToInput } from "../mappers";

export type GetInput = {
  id: string,
}

export class GetCommand implements Command {
  constructor(
    private readonly input: GetInput,
    private readonly todoService: TodoService, 
    private readonly logger: Logger
  ) {};

  async execute(): Promise<void> {
    const { id } = this.input;

    const item = await this.todoService.get(id);

		this.logger.withContext(item).notify(`Item[${id}] found`);
  }
};

export const mapToGetCommandInput = (input: string): GetInput => {
  const { value } = mapToInput(input);
  
  if (!value) {
    throw new ValidationError('"value" must be type of string, not empty');
  }

  return { id: value };
}