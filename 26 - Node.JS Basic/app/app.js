const TodoList = require('./todo-list.js');

class App {
	constructor(arg) {
		this.arg = arg;
		this.list = new TodoList();
	}

	async handle() {
		try {
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
		} catch ({ message }) {
			console.log(message);
		}
	}

	async handleSet(option, value) {
		switch (value) {
		case 'true': {
			await this.list.set(option, true);

			console.log('todo item is now completed');
			break;
		}
		case 'false': {
			await this.list.set(option, false);

			console.log('todo item is now uncompleted');
			break;
		}
		default: {
			await this.list.set(option, value);

			console.log('todo item is successfully updated');
			break;
		}}
	}

	async handleGet(option, value) {
		switch (option) {
		case '!': {
			const todos = await this.list.getAll();

			console.log(todos);
			break;
		}
		case '+': {
			const todos = await this.list.getAll(true);

			console.log(todos);
			break;
		}
		case '-': {
			const todos = await this.list.getAll(false);

			console.log(todos);
			break;
		}
		case '^': {
			const todos = await this.list.search(value);

			console.log(todos);
			break;
		}
		default: {
			const todo = await this.list.get(option);
		
			console.log(todo);
			break;
		}}
	}

	async handleAdd(value) {
		await this.list.add(value);

		console.log('todo item is successfully added');
	}

	async handleDelete(option) {
		switch (option) {
		case '!':
			await this.list.clear();

			console.log('todo list is successfully cleared');
			break;
		default: {
			await this.list.remove(option);

			console.log('todo item is successfully removed');
			break;
		}}
	}
}

module.exports = App;