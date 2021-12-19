const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const filePath = path.resolve(__dirname, '../todos.json');


const getState = async () => {
	try {
		const file = await fs.promises.readFile(filePath, 'utf-8');

		return JSON.parse(file);
	} catch (error) {
		console.error(error);
	}
};

const setState = async (items) => {
	try {
		await fs.promises.writeFile(filePath, JSON.stringify(items));
	} catch (error) {
		console.error(error);
	}
};

class TodoList {
	async add(text) {
		const todos = await getState();

		todos.push({ id: uuid(), text, completed: false });

		await setState(todos);
	}

	async set(id, update) {
		const todos = await getState();

		const index = todos.findIndex(todo => todo.id === id);

		if (index < 0) {
			throw new Error('no item with given id');
		}

		switch (typeof update) {
		case 'boolean':
			todos[index].completed = update;
			break;
		default:
			todos[index].text = update;
			break;
		}

		await setState(todos);
	}

	async get(id) {
		const todos = await getState();

		const match = todos.find(todo => todo.id === id);

		if (!match) {
			throw new Error('no item with given id');
		}

		return match;
	}

	async remove(id) {
		const todos = await getState();

		const filtered = todos.filter(todo => todo.id !== id);

		if (todos.length === filtered.length) {
			throw new Error('no item with given id');
		}

		await setState(filtered);
	}

	async getAll(completed) {
		const todos = await getState();

		switch (completed) {
		case false:
			return todos.filter(todo => todo.completed === false);
		case true:
			return todos.filter(todo => todo.completed === true);
		default:
			return todos;
		}
	}

	async search(substring) {
		const todos = await getState();

		return todos.filter(todo => todo.text.includes(substring));
	}

	async clear() {
		await setState([]);
	}
};

module.exports = TodoList;