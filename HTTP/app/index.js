const DOM = new DOMRender(document.querySelector("#root"));

const ACTIONS = {
	async createTodo(title) {
		return await XHR.post(
			"https://jsonplaceholder.typicode.com/users/1/todos",
			{
				fakeId: new Date().valueOf(),
				title,
				completed: false,
			}
		);
	},
	async removeTodo(id) {
		return await XHR.remove(`https://jsonplaceholder.typicode.com/todos/${id}`);
	},
	async getTodos() {
		return await XHR.get("https://jsonplaceholder.typicode.com/users/1/todos");
	},
	async getTodo(id) {
		return await XHR.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
	},
};

const AddTodo = DOMRender.withState("", (value, setValue, { onClick }) => {
	const change = ({ target }) => {
		setValue(target.value);
	};

	return DOM.create("div")({
		children: [
			DOM.create("input")({
				props: {
					value,
				},
				handlers: {
					change,
				},
			}),
			DOM.create("button")({
				children: ["+"],
				handlers: {
					click: onClick(value),
				},
			}),
		],
	});
});

const Todo = ({ id, fakeId, title, onRemove }) => {
	return DOM.create("li")({
		attrs: {
			"data-id": fakeId ?? id,
		},
		children: [
			title,
			DOM.create("button")({
				children: ["x"],
				handlers: {
					click: onRemove,
				},
			}),
		],
	});
};

const Todos = ({ items, onRemove }) => {
	return DOM.create("ul")({
		children: items.map((todo) => Todo({ ...todo, onRemove: onRemove(todo) })),
	});
};

ACTIONS.getTodos().then(({ response }) => {
	const App = DOMRender.withState(response.slice(0, 10), (items, setItems) => {
		const create = (data) => async () => {
			try {
				const { response } = await ACTIONS.createTodo(data);

				setItems((items) => [...items, response]);
			} catch (err) {
				console.error(err);
			}
		};

		const remove =
			({ id, fakeId }) =>
			async () => {
				try {
					await ACTIONS.removeTodo(id);

					setItems((items) =>
						items.filter((item) => (item.fakeId ?? item.id) !== (fakeId ?? id))
					);
				} catch (err) {
					console.error(err);
				}
			};

		return DOM.create("section")({
			children: [
				AddTodo({ onClick: create }),
				Todos({ items, onRemove: remove }),
			],
		});
	});

	DOM.mount(App());
});

ACTIONS.getTodo(1).then(console.log);
