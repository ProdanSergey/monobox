import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { ValidationError } from "../domain/error";
import { mapToInput } from "../mappers";

export type DeleteInput = {
  id: string;
};

export class DeleteCommand implements Command {
  constructor(
    private readonly input: DeleteInput,
    private readonly todoService: TodoService,
    private readonly logger: Logger
  ) {}

  async execute(): Promise<void> {
    const { id } = this.input;

    await this.todoService.remove(id);

    this.logger.notify(`Item[${id}] deleted`);
  }
}

export const mapToDeleteCommandInput = (input: string): DeleteInput => {
  const { value } = mapToInput(input);

  if (!value) {
    throw new ValidationError('"value" must be type of string, not empty');
  }

  return { id: value };
};
