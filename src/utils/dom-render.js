export const DOMRender = (() => {
	const isObject = (v) =>
		typeof v === "object" && !Array.isArray(v) && v !== null;

	const setProps = (element, props) => {
		for (const key of Object.getOwnPropertyNames(props)) {
			element[key] = props[key];
		}
	};

	const classnames = (element, classNames) => {
		for (const cn of classNames) {
			if (isObject(cn)) {
				for (const key of Object.getOwnPropertyNames(cn).filter((k) =>
					Boolean(cn[k])
				)) {
					element.classList.add(key);
				}
			} else {
				element.classList.add(cn);
			}
		}
	};

	const setAttrs = (element, attrs) => {
		for (const key of Object.getOwnPropertyNames(attrs)) {
			element.setAttribute(key, attrs[key]);
		}
	};

	const setListeners = (element, handlers) => {
		for (const type of Object.getOwnPropertyNames(handlers)) {
			element.addEventListener(type, handlers[type]);
		}
	};

	const setChildren = (element, children) => {
		for (const child of children.filter(Boolean)) {
			if (child instanceof Node) {
				element.append(child);
			} else {
				element.insertAdjacentHTML("afterbegin", child);
			}
		}
	};

	const render =
		(element) =>
		(options = {}) => {
			const {
				classNames = [],
				props = {},
				attrs = {},
				handlers = {},
				children = [],
			} = options;

			classnames(element, classNames);
			setProps(element, props);
			setAttrs(element, attrs);
			setListeners(element, handlers);
			setChildren(element, children);

			return element;
		};

	class DOMRender {
		constructor(root) {
			if (root instanceof HTMLElement) {
				this.root = root;
			} else {
				throw new Error("Provide a valid mount point");
			}
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
			let node, props, render;

			let state = initial;

			const setState = (update) => {
				const predecessor = node;

				const successor = render(
					(state = typeof update === "function" ? update(state) : update),
					setState,
					props
				);

				requestAnimationFrame(() => {
					predecessor.replaceWith(successor);
				});
			};

			return (render = (...args) => {
				return (node = component.call(
					null,
					state,
					setState,
					(props = args.at(-1))
				));
			});
		}
	}

	return DOMRender;
})();
