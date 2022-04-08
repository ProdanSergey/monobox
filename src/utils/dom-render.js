import { compose, isObject, isFalsy, isFunction } from "./fn";

export const DOMRender = (() => {
	class DOMError extends Error {
		name = "DOMError";
	}

	const applyClassName = (classNames, element) => {
		const className = classNames.shift();

		if (isFalsy(className)) return element;

		if (isObject(className)) {
			return applyClassName(
				Object.getOwnPropertyNames(className).reduce(
					(classNames, key) => (isFalsy(className[key]) ? classNames : [...classNames, className[key]]),
					[]
				),
				element
			);
		}

		element.classList.add(className);

		return applyClassName(classNames, element);
	};

	const withClassNames = (classNames) => (element) => {
		applyClassName(Array.from(classNames), element);

		return element;
	};

	const applyProperty = (key, value) => (element) => {
		if (Object.prototype.hasOwnProperty.call(element, key)) {
			element[key] = value;
		}

		return element;
	};

	const applyAttribute = (key, value) => (element) => {
		if (!Object.prototype.hasOwnProperty.call(element, key)) {
			element.setAttribute(key, value);
		}

		return element;
	};

	const withProps = (props) => (element) => {
		for (const key of Object.getOwnPropertyNames(props)) {
			compose(applyAttribute(key, props[key]), applyProperty(key, props[key]))(element);
		}

		return element;
	};

	const applyHandler = (key, value) => (element) => {
		element.addEventListener(key, value);
	};

	const withListeners = (handlers) => (element) => {
		for (const type of Object.getOwnPropertyNames(handlers)) {
			applyHandler(type, handlers[type])(element);
		}

		return element;
	};

	const appendNode = (child) => (element) => {
		if (child instanceof Node) {
			element.append(child);
		}

		return element;
	};

	const appendHTML = (child) => (element) => {
		if (!(child instanceof Node)) {
			element.insertAdjacentHTML("afterbegin", child);
		}

		return element;
	};

	const withChildren = (children) => (element) => {
		for (const child of children.filter(Boolean)) {
			compose(appendNode(child), appendHTML(child))(element);
		}

		return element;
	};

	const render = (element) => (options) => {
		if (isFalsy(options)) return element;

		const { classNames = [], children = [], props = {}, handlers = {} } = options;

		return compose(
			withChildren(children),
			withListeners(handlers),
			withProps(props),
			withClassNames(classNames)
		)(element);
	};

	class DOMRender {
		constructor(root) {
			if (!(root instanceof HTMLElement)) {
				throw new DOMError("Mount root is not defined");
			}

			this.root = root;
		}

		mount(element) {
			this.root.replaceChildren(element);
		}

		create(tagName) {
			return render(document.createElement(tagName));
		}

		render(target) {
			return render(target);
		}

		static withState(initial, component) {
			let state = initial,
				root,
				render;

			const reRender = () => {
				const ref = root;
				root = render([state, setState]);

				requestAnimationFrame(() => {
					ref.replaceWith(root);
				});
			};

			const setState = (update) => {
				state = isFunction(update) ? update(state) : update;
				reRender();
			};

			const bind = (...args) => {
				return (render = component.bind(null, ...args));
			};

			return (...args) => (root = bind(...args)([state, setState]));
		}
	}

	return DOMRender;
})();
