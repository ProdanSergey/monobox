import { BaseComponent, section } from "@utils/dom";
import { api } from "./api";
import { AddTodo } from "./components/add-todo";
import { TodoList } from "./components/todo-list";

export class App extends BaseComponent {
  state = { items: [] };

  create = async ({ detail }) => {
    try {
      const { response } = await api.createTodo(detail.value);

      this.state.items = [...this.state.items, response];
    } catch (err) {
      console.error(err);
    }
  };

  remove = async ({ detail }) => {
    try {
      await api.removeTodo(detail.id);

      this.state.items = this.state.items.filter(({ fakeId, id }) => (fakeId ?? id) !== detail.id);
    } catch (err) {
      console.error(err);
    }
  };

  async onMount() {
    const { response } = await api.getTodos();

    this.state.items = response.slice(0, 10);
  }

  render() {
    return section(
      {
        "@todo:add": this.create,
        "@todo:remove": this.remove,
      },
      [new AddTodo(), new TodoList({ items: this.state.items })]
    );
  }
}
