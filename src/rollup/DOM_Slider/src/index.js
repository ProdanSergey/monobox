import "./styles/index.css";

class Framework {
	static createRef() {
		return {
			current: null,
			setRef(ref) {
				this.current = ref;
			},
		};
	}

	static mount(root, component) {
		root.replaceChildren(component.render());
	}
}
class BaseComponent {
	constructor(tagName, props, options = {}, refs) {
		this.element = this.create(tagName);

		this.props = props;

		const { attributes, children } = options;

		this.attributes = this.setAttributes(attributes);
		this.children = this.setChildren(children);
		this.refs = refs;
	}

	withRef(ref) {
		this.ref = ref;

		return this;
	}

	create(tagName) {
		return document.createElement(tagName);
	}

	setAttributes(attributes = {}) {
		for (const key of Object.getOwnPropertyNames(attributes)) {
			if (key in this.element) {
				this.element[key] = attributes[key];
			} else {
				this.element.setAttribute(key, attributes[key]);
			}
		}

		return this.element.attributes;
	}

	setChildren(children = []) {
		for (const child of children) {
			if (child instanceof BaseComponent) {
				this.element.append(child.render());
			} else {
				this.element.insertAdjacentHTML("afterBegin", child);
			}
		}

		return this.element.children;
	}

	render() {
		if (this.ref) {
			this.ref.setRef(this.element);
		}

		return this.element;
	}
}

class ImageComponent extends BaseComponent {
	constructor(props) {
		super("img", props, {
			attributes: {
				className: ["sc-image"],
				src: props.src,
			},
		});
	}
}

class SliderItemComponent extends BaseComponent {
	constructor(props) {
		super("div", props, {
			attributes: {
				className: "sc-slider__item",
			},
			children: [props.item],
		});
	}
}

class SliderTrackComponent extends BaseComponent {
	constructor(props) {
		super("div", props, {
			attributes: {
				className: ["sc-slider__track"],
			},
			children: props.items.map((item) => new SliderItemComponent({ item })),
		});
	}
}

class SliderControlComponent extends BaseComponent {
	constructor(props) {
		const { icon, position, onClick } = props;

		super("button", props, {
			attributes: {
				onclick: onClick,
				className: ["sc-slider__control", position].join(" "),
			},
			children: [icon],
		});
	}
}

class SliderComponent extends BaseComponent {
	constructor(props) {
		const trackRef = Framework.createRef();

		super(
			"div",
			props,
			{
				attributes: {
					className: ["sc-slider"],
				},
				children: [
					new SliderControlComponent({ icon: "<", position: "left", onClick: () => this.prev() }),
					new SliderTrackComponent({
						items: props.items,
					}).withRef(trackRef),
					new SliderControlComponent({ icon: ">", position: "right", onClick: () => this.next() }),
				],
			},
			{ track: trackRef }
		);
	}

	prev() {
		const { current: track } = this.refs.track;

		this.isAtFirstSlide() ? this.toLastSlide() : (track.scrollLeft -= track.clientWidth);
	}

	next() {
		const { current: track } = this.refs.track;

		this.isAtLastSlide() ? this.toFirstSlide() : (track.scrollLeft += track.clientWidth);
	}

	isAtLastSlide() {
		const { current: track } = this.refs.track;

		return track.scrollLeft >= track.clientWidth * (this.props.items.length - 1);
	}

	toLastSlide() {
		const { current: track } = this.refs.track;

		track.scrollLeft = track.clientWidth * (this.props.items.length - 1);
	}

	isAtFirstSlide() {
		const { current: track } = this.refs.track;

		return track.scrollLeft === 0;
	}

	toFirstSlide() {
		const { current: track } = this.refs.track;

		track.scrollLeft = 0;
	}
}

const slider = new SliderComponent({
	items: [
		new ImageComponent({ src: "https://picsum.photos/640/480?random=1" }),
		new ImageComponent({ src: "https://picsum.photos/640/480?random=2" }),
		new ImageComponent({ src: "https://picsum.photos/640/480?random=3" }),
		new ImageComponent({ src: "https://picsum.photos/640/480?random=4" }),
		new ImageComponent({ src: "https://picsum.photos/640/480?random=5" }),
	],
});

Framework.mount(document.getElementById("root"), slider);
