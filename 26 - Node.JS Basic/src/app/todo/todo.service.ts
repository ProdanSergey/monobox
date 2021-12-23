import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

const filePath = './todos.json';

class Todo {
	public id: string = uuid()

	constructor(
		public text: string, 
		public completed: boolean = false, 
	) {}
}

type State = Todo[]

const getState = async (): Promise<State> => {
	const file = await fs.promises.readFile(filePath, 'utf-8');

	return JSON.parse(file);
};

const setState = async (state: State): Promise<void> => {
	await fs.promises.writeFile(filePath, JSON.stringify(state));
};

export const TodoService = class TodoService {
	async add(text: string) {
		const state = await getState();

		state.push(new Todo(text));

		await setState(state);
	}

	async set(id: string, update: string | boolean): Promise<void> {
		const state = await getState();

		const index = state.findIndex(todo => todo.id === id);

		if (index < 0) {
			throw new Error('no item with given id');
		}

		switch (typeof update) {
		case 'boolean':
			state[index].completed = update;
			break;
		default:
			state[index].text = update;
			break;
		}

		await setState(state);
	}

	async get(id: string): Promise<Todo> {
		const state = await getState();

		const todo = state.find(todo => todo.id === id);

		if (!todo) {
			throw new Error('no item with given id');
		}

		return todo;
	}

	async remove(id: string): Promise<void> {
		const state = await getState();

		const filtered = state.filter(todo => todo.id !== id);

		if (state.length === filtered.length) {
			throw new Error('no item with given id');
		}

		await setState(filtered);
	}

	async getAll(completed?: boolean): Promise<State> {
		const state = await getState();

		switch (completed) {
		case false:
			return state.filter(todo => todo.completed === false);
		case true:
			return state.filter(todo => todo.completed === true);
		default:
			return state;
		}
	}

	async search(substring: string): Promise<State> {
		const state = await getState();

		return state.filter(todo => todo.text.includes(substring));
	}

	async clear(): Promise<void> {
		await setState([]);
	}
};