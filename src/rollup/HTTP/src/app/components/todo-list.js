import { list } from "@utils/dom";
import { Todo } from "./todo";

export const TodoList = ({ items, onRemove }) => {
	return list(
		false,
		{},
		items.map((todo) => Todo({ ...todo, onRemove: onRemove(todo) }))
	);
};
