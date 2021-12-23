import { TodoService } from './todo.service';

export const TodoController = class TodoController {
	constructor(
		private readonly arg: string,
		private readonly todoService = new TodoService() 
	) {}

	async handle(): Promise<void> {
		if (!this.arg) {
			throw new Error('no command provided');
		}

		const [type, value] = this.arg.split('=');
		const [method, option] = type.split(':');

		switch (method) {
		case 'set':
			await this.handleSet(option, value);
			break;
		case 'get': 
			await this.handleGet(option, value);
			break;
		case 'add': 
			await this.handleAdd(value);
			break;
		case 'delete':
			await this.handleDelete(option);
			break;
		default:
			throw new Error('wrong command');
		}
	}

	async handleSet(option: string, value: string): Promise<void> {
		switch (value) {
		case 'true': {
			await this.todoService.set(option, true);

			console.log('todo item is now completed');
			break;
		}
		case 'false': {
			await this.todoService.set(option, false);

			console.log('todo item is now uncompleted');
			break;
		}
		default: {
			await this.todoService.set(option, value);

			console.log('todo item is successfully updated');
			break;
		}}
	}

	async handleGet(option: string, value: string): Promise<void> {
		switch (option) {
		case '!': {
			const todos = await this.todoService.getAll();

			console.log(todos);
			break;
		}
		case '+': {
			const todos = await this.todoService.getAll(true);

			console.log(todos);
			break;
		}
		case '-': {
			const todos = await this.todoService.getAll(false);

			console.log(todos);
			break;
		}
		case '^': {
			const todos = await this.todoService.search(value);

			console.log(todos);
			break;
		}
		default: {
			const todo = await this.todoService.get(option);
		
			console.log(todo);
			break;
		}}
	}

	async handleAdd(value: string): Promise<void> {
		await this.todoService.add(value);

		console.log('todo item is successfully added');
	}

	async handleDelete(option: string): Promise<void> {
		switch (option) {
		case '!':
			await this.todoService.clear();

			console.log('todo list is successfully cleared');
			break;
		default: {
			await this.todoService.remove(option);

			console.log('todo item is successfully removed');
			break;
		}}
	}
}