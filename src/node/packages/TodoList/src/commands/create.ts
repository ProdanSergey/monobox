import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { mapToInput, mapToTextQuery } from "../mappers";

export type CreateInput = {
  text: string;
};

export class CreateCommand implements Command {
  constructor(
    private readonly input: CreateInput,
    private readonly todoService: TodoService,
    private readonly logger: Logger
  ) {}

  async execute(): Promise<void> {
    const { text } = this.input;

    const item = await this.todoService.add(text);

    this.logger.withContext(item).notify(`Item[${item.id}] added`);
  }
}

export const mapToCreateCommandInput = (input: string): CreateInput => {
  const { query } = mapToInput(input);
  const { text } = mapToTextQuery(query.text);

  return { text };
};
