import * as fs from "fs";
import { resolve } from "path";
import { v4 as uuid } from "uuid";
import { InternalError, NotFoundError } from "../domain/error";

const filePath = resolve(__dirname, "../store.json");

class Todo {
  public id = uuid().split("-")[0];
  public completed = false;
  public text = "";

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}

type State = Todo[];

const getState = async (): Promise<State> => {
  let data = "[]";

  try {
    data = await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    await fs.promises.writeFile(filePath, data);
  }

  return JSON.parse(data);
};

const setState = async (state: State): Promise<void> => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(state));
  } catch (error) {
    throw new InternalError();
  }
};

type TodoListQuery = {
  completed?: boolean;
  limit?: number;
  search?: string;
};

export class TodoService {
  async add(text: string): Promise<Todo> {
    const state = await getState();

    const todo = new Todo({ text });

    state.push(todo);

    await setState(state);

    return todo;
  }

  async update(id: string, partial: Partial<Todo>): Promise<Todo> {
    const { index, state } = await this.indexOf(id);

    const todo = new Todo({ ...state[index], ...partial });

    state[index] = todo;

    await setState(state);

    return todo;
  }

  async get(id: string): Promise<Todo> {
    const { todo } = await this.find(id);

    return todo;
  }

  async remove(id: string): Promise<void> {
    const { index, state } = await this.indexOf(id);

    state.splice(index, 1);

    await setState(state);
  }

  async list({ completed, limit, search }: TodoListQuery): Promise<Todo[]> {
    let state = await getState();

    if (completed !== undefined) {
      state = state.filter((todo) => todo.completed === completed);
    }

    if (search !== undefined) {
      state = state.filter((todo) => todo.text.includes(search));
    }

    if (limit) {
      state = state.slice(0, limit);
    }

    return state;
  }

  async clear(): Promise<void> {
    await setState([]);
  }

  private async indexOf(id: string): Promise<{ index: number; state: State }> {
    const state = await getState();

    const index = state.findIndex((todo) => todo.id === id);

    if (index < 0) {
      throw new NotFoundError();
    }

    return { index, state };
  }

  private async find(id: string): Promise<{ todo: Todo; state: State }> {
    const { index, state } = await this.indexOf(id);

    return {
      todo: new Todo(state[index]),
      state,
    };
  }
}
