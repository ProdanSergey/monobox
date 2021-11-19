const DOMRender = (() => {
	const setProps = (element, props) => {
		for (const key of Object.getOwnPropertyNames(props)) {
			element[key] = props[key];
		}	
	};

	const setListeners = (element, handlers) => {
		for (const type of Object.getOwnPropertyNames(handlers)) {
			element.addEventListener(type, handlers[type]);
		}	
	};
	
	const setChildren = (element, children) => {
		for (const child of children) {
			if (child instanceof Node) {
				element.append(child);
			} else {
				element.insertAdjacentHTML('afterbegin', child);
			}
		}
	};
	
	const render = (element) => (options = {}) => {
		const { props = {}, handlers = {}, children = [] } = options;
	
		setProps(element, props);
		setListeners(element, handlers);
		setChildren(element, children);
		
		return element;
	};

	class DOMRender {
		constructor(root) {
			if (root instanceof HTMLElement) {
				this.root = root;
			} else {
				throw new Error('Provide a valid mount point');
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
	}

	return DOMRender;
})();

const withState = (initial, component) => {	
	let node, props, render;

	let state = initial;

	const setState = (update) => {		
		node.replaceWith(
			render(
				state = typeof update === 'function' ? update(state) : update,
				setState, 
				props
			)
		);
	};

	return render = (...args) => {	
		return node = component.call(null, state, setState, props = args.at(-1));
	};
};
