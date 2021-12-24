import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { BadRequestError, InternalError, NoContentError, NotFoundError } from '../../utils/error.util';

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
	let data = '[]';
	
	try {
		data = await fs.promises.readFile(filePath, 'utf-8');
	} catch (error) {
		await fs.promises.writeFile(filePath, data);
	} finally {
		return JSON.parse(data);
	}
};

const setState = async (state: State): Promise<void> => {
	try {
		await fs.promises.writeFile(filePath, JSON.stringify(state));
	} catch (error) {
		throw new InternalError();
	}
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
			throw new BadRequestError();
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

		const match = state.find(todo => todo.id === id);

		if (!match) {
			throw new NotFoundError();
		}

		return match;
	}

	async remove(id: string): Promise<void> {
		const state = await getState();

		const filtered = state.filter(todo => todo.id !== id);

		if (state.length === filtered.length) {
			throw new NotFoundError();
		}

		await setState(filtered);
	}

	async getAll(completed?: boolean): Promise<State> {
		const state = await getState();

		let all;

		switch (completed) {
		case false:
			all = state.filter(todo => todo.completed === false);
			break;
		case true:
			all =  state.filter(todo => todo.completed === true);
			break;
		default:
			all = state;
		}

		if (all.length < 1) {
			throw new NoContentError();
		}

		return state;
	}

	async search(substring: string): Promise<State> {
		const state = await getState();

		const found = state.filter(todo => todo.text.includes(substring));

		if (found.length < 1) {
			throw new NotFoundError();
		}

		return found;
	}

	async clear(): Promise<void> {
		await setState([]);
	}
};