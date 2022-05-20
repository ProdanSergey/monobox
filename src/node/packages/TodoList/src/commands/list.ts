import { Logger } from "../ports/logger";
import { Command } from "../types/command";
import { TodoService } from "../app/todo.service";
import { mapToInput, mapToLimitQuery, mapToSearchQuery, mapToStatusQuery } from "../mappers";

export type ListInput = {
  completed?: boolean;
  limit?: number;
  search?: string;
};

export class ListCommand implements Command {
  constructor(
    private readonly input: ListInput,
    private readonly todoService: TodoService,
    private readonly logger: Logger
  ) {}

  async execute(): Promise<void> {
    const { completed, search, limit } = this.input;

    const items = await this.todoService.list({ completed, search, limit });

    this.logger.withContext(items).notify(`Items[${items.length}] found`);
  }
}

export const mapToListCommandInput = (input: string): ListInput => {
  const { query } = mapToInput(input);

  const { status } = mapToStatusQuery(query.status);
  const { search } = mapToSearchQuery(query.search);
  const { limit } = mapToLimitQuery(query.limit);

  return { completed: status, search, limit };
};
