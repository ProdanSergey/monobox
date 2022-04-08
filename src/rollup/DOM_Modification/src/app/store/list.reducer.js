import { DOMRender } from "@utils/dom-render";

const addItem =
	({ items }) =>
	(item) =>
		[...items, item];

export const ListReducer = DOMRender.createReducer(
	{
		items: [],
	},
	{
		addItem,
	}
);
