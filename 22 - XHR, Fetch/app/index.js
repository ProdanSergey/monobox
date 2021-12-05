const DOM = new DOMRender(document.querySelector('#root'));

const ACTIONS = {
	async createTodo(data) {
		return await XHR.post('https://jsonplaceholder.typicode.com/todos', { 
			data,
			dataId: new Date().valueOf()
		});
	},
	async removeTodo(id) {
		return await XHR.remove(`https://jsonplaceholder.typicode.com/todos/${id}`);
	}
};

const AddTodo = DOMRender.withState('', (value, setValue, { onClick }) => {
	const change = ({ target }) => {
		setValue(target.value);
	};
	
	return DOM.create('div')({
		children: [
			DOM.create('input')({
				props: {
					value
				},
				handlers: {
					change
				}
			}),
			DOM.create('button')({
				children: [
					'+'
				],
				handlers: {
					click: onClick(value)
				},
			})
		],
	});
});

const Todo = ({ dataId, data, onRemove }) => {
	return DOM.create('li')({
		attrs: {
			'data-id': dataId
		},
		children: [
			data,
			DOM.create('button')({
				children: ['x'],
				handlers: {
					click: onRemove
				}
			})
		],
	});
};

const Todos = ({ items, onRemove }) => {
	return DOM.create('ul')({
		children: items.map((todo) => Todo({...todo, onRemove: onRemove(todo)}))
	});
};

const App = DOMRender.withState([], (items, setItems) => {
	const create = (data) => async () => {
		try {
			const { response } = await ACTIONS.createTodo(data);

			setItems(items => [...items, response]);
		} catch (err) {
			console.error(err);
		}
	};

	const remove = ({ id, dataId }) => async () => {
		try {
			await ACTIONS.removeTodo(id);

			setItems(items => items.filter((item) => item.dataId !== dataId));
		} catch (err) {
			console.error(err);
		}
	};
	
	return DOM.create('section')({
		children: [
			AddTodo({ onClick: create }),
			Todos({ items, onRemove: remove })
		]
	});
});

DOM.mount(App());