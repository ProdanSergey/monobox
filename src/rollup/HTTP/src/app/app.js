import { BaseComponent, section } from "@utils/dom";
import { api } from "./api";
import { AddTodo } from "./components/add-todo";
import { TodoList } from "./components/todo-list";

export class App extends BaseComponent {
	state = { items: null };

	create = (data) => async () => {
		try {
			const { response } = await api.createTodo(data);

			this.state.items = [...this.state.items, response];
		} catch (err) {
			console.error(err);
		}
	};

	remove =
		({ id, fakeId }) =>
		async () => {
			try {
				await api.removeTodo(id);

				this.state.items = this.state.items.filter((item) => (item.fakeId ?? item.id) !== (fakeId ?? id));
			} catch (err) {
				console.error(err);
			}
		};

	async onMount() {
		const { response } = await api.getTodos();

		this.state.items = response.slice(0, 10);
	}

	render() {
		return this.state.items
			? section({}, [AddTodo({ onClick: this.create }), TodoList({ items: this.state.items, onRemove: this.remove })])
			: section();
	}
}
