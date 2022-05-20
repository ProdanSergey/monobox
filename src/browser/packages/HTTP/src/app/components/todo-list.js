import { BaseComponent, uList } from "@utils/dom";
import { Todo } from "./todo";

export class TodoList extends BaseComponent {
  render() {
    const { items } = this.props;

    return uList(
      {},
      items.map((todo) => new Todo(todo))
    );
  }
}
