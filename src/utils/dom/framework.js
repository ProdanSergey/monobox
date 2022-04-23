import { ArrayNamespace, compose, ObjectNamespace } from "@utils/fn";
import { isComponent, isFnComponent, isElement, isEventHandler } from "./utils/fn";

const create = (entity) => {
	if (isElement(entity)) {
		return entity;
	}

	return document.createElement(entity);
};

const render = (node) => {
	if (isComponent(node)) {
		return node.render();
	}

	if (isFnComponent(node)) {
		return node();
	}

	return node;
};

const listen = (container, event, handler) => {
	const eventType = event.slice(1).toLowerCase();

	container.addEventListener(eventType, handler, false);

	return () => {
		container.removeEventListener(eventType, handler, false);
	};
};

const withChildren = (children) => (container) => {
	container.append(...children.map(render));

	return container;
};

const withHandlers = (handlers) => (container) => {
	for (const key of Object.keys(handlers)) {
		listen(container, key, handlers[key]);
	}

	return container;
};

const withProps = (props) => (container) => {
	const [standard, custom] = ArrayNamespace.segregate(Object.keys(props), (key) => {
		return key in container;
	});

	for (const key of standard) {
		container[key] = props[key];
	}

	for (const key of custom) {
		container.setAttribute(key, props[key]);
	}

	return container;
};

const withRef = (ref) => (container) => {
	if (ref) ref.set(container);

	return container;
};

const mapAttributes = (attributes) => {
	const [refKey, handlerKeys, propsKeys] = ArrayNamespace.segregate(
		Object.keys(attributes),
		(key) => key === "ref",
		(key) => key.startsWith("@")
	);

	return {
		ref: attributes[refKey],
		handlers: ObjectNamespace.pick(attributes, handlerKeys),
		props: ObjectNamespace.pick(attributes, propsKeys),
	};
};

export class Framework {
	static create(entity, attributes = {}, children = []) {
		const element = create(entity);

		const { ref, handlers, props } = mapAttributes(attributes);

		return compose(withChildren(children), withHandlers(handlers), withProps(props), withRef(ref))(element);
	}

	static fragment(...children) {
		const fragment = document.createDocumentFragment();

		return compose(withChildren(children))(fragment);
	}

	static mount(root, node) {
		root.replaceChildren(render(node));
	}

	static interpolate(node) {
		return node.outerHTML;
	}

	static hydrate(node, handlers) {
		const div = Framework.create("div");

		div.insertAdjacentHTML("afterbegin", node.trim());

		const setHandler = (nodes) => {
			for (const node of nodes) {
				Array.from(node.attributes).forEach(({ name, value, ownerElement }) => {
					if (!isEventHandler(name)) {
						return;
					}

					if (ownerElement && handlers[value]) {
						listen(ownerElement, name, handlers[value]);
					}

					ownerElement.removeAttribute(name);
				});

				node.children && setHandler(node.children);
			}
		};

		setHandler(div.children);

		return Framework.fragment(...div.children);
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
