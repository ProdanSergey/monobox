import { DOMRender } from "@utils/dom-render";
import DOM from "../../dom";

const ListItem = ({ text }) => {
	return DOM.create("li")({
		props: {
			className: "list__item",
		},
		children: [text],
	});
};

export const List = DOMRender.withState([], (props, state) => {
	const [items, setItems] = state;

	const addItem = () => {
		setItems((items) => items.concat({ text: "Hello World" }));
	};

	return DOM.create("section")({
		children: [
			DOM.create("div")({
				children: [
					`<span>${props.title}: ${items.length}</span>`,
					DOM.create("button")({
						props: {
							className: "add",
						},
						children: ["Add Item"],
						handlers: {
							click: addItem,
						},
					}),
				],
			}),
			DOM.create("ul")({
				props: {
					className: "list",
				},
				children: items.map(ListItem),
			}),
		],
	});
});
