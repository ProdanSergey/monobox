export class BaseComponent {
	constructor(tagName, props = {}, options = {}, refs = {}) {
		this.container = this.create(tagName);
		this.refs = this.setRefs(refs);
		this.props = props;

		const { attributes, children } = options;

		this.attributes = this.setAttributes(attributes);
		this.children = this.setChildren(children);
	}

	create(tagName) {
		return document.createElement(tagName);
	}

	setRefs(refs) {
		return refs;
	}

	setAttributes(attributes = {}) {
		for (const key of Object.getOwnPropertyNames(attributes)) {
			if (key in this.container) {
				this.container[key] = attributes[key];
			} else {
				this.container.setAttribute(key, attributes[key]);
			}
		}

		return this.container.attributes;
	}

	setChildren(children = []) {
		for (const child of children) {
			if (child instanceof BaseComponent) {
				this.container.append(child.render());
			} else {
				this.container.insertAdjacentHTML("afterBegin", child);
			}
		}

		return this.container.children;
	}

	withRef(ref) {
		ref.set(this.container);

		return this;
	}

	render() {
		return this.container;
	}
}
