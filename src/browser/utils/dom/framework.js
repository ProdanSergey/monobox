import { ArrayNamespace, compose, isNullish, ObjectNamespace } from "@utils/fn";
import { isEventHandler, isElement } from "./utils/fn";
import { setAttribute, mapAttributes } from "./utils/attributes";
import { create } from "./utils/create";
import { render } from "./utils/render";
import { listen } from "./utils/listen";

const withChildren = (children) => (node) => {
	node.append(...children.filter((child) => !isNullish(child)).map(render));

	return node;
};

const withHandlers = (handlers) => (node) => {
	const then_listen = listen(node);

	ObjectNamespace.forEach(handlers, (event, handler) => {
		then_listen(event, handler);
	});

	return node;
};

const withProps = (props) => (node) => {
	const then_set_attribute = setAttribute(node);

	ObjectNamespace.forEach(props, (key, value) => {
		then_set_attribute(key, value);
	});

	return node;
};

const withRef = (ref) => (node) => {
	if (ref) ref.set(node);

	return node;
};

export class Framework {
	static create(tagName, attributes = {}, children = []) {
		const { ref, handlers, props } = mapAttributes(attributes);

		return compose(withRef(ref), withChildren(children), withHandlers(handlers), withProps(props))(create(tagName));
	}

	static mount(root, node) {
		if (!isElement(root)) {
			throw new DOMException("Root must be valid DOM element");
		}
		root.replaceChildren(render(node));
	}

	static interpolate(node) {
		return node.outerHTML;
	}

	static hydrate(html, handlers) {
		const then_listen = (node) => {
			for (const child of node.children) {
				const [handlerKeys] = ArrayNamespace.segregate(Array.from(child.attributes), (key) => isEventHandler(key));

				handlerKeys.forEach(({ name, value, ownerElement }) => {
					if (handlers[value]) {
						listen(child)(name, handlers[value]);
					}

					ownerElement.removeAttribute(name);
				});

				then_listen(child);
			}
		};

		const div = create("div");
		div.insertAdjacentHTML("afterbegin", html);

		then_listen(div.firstElementChild);

		return div.firstElementChild;
	}

	static createRef(key) {
		return Object.seal({
			current: null,
			set(ref) {
				this.current = ref;

				return { [key]: this.current };
			},
		});
	}
}
