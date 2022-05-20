import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { ValidationError } from "../domain/error";
import { mapToInput, mapToTextQuery } from "../mappers";

export type UpdateInput = {
  id: string;
  text: string;
};

export class UpdateCommand implements Command {
  constructor(
    private readonly input: UpdateInput,
    private readonly todoService: TodoService,
    private readonly logger: Logger
  ) {}

  async execute(): Promise<void> {
    const { id, text } = this.input;

    const item = await this.todoService.update(id, { text });

    this.logger.withContext(item).notify(`Item[${id}] updated`);
  }
}

export const mapToUpdateCommandInput = (input: string): UpdateInput => {
  const { value, query } = mapToInput(input);

  if (!value) {
    throw new ValidationError('"value" must be type of string, not empty');
  }

  const { text } = mapToTextQuery(query.text);

  return { id: value, text };
};
