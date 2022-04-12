export class Framework {
	static className(...classNames) {
		return classNames.join(" ");
	}

	static createRef(key) {
		return {
			current: null,
			set(ref) {
				this.current = ref;

				return { [key]: this.current };
			},
		};
	}

	static mount(root, component) {
		root.replaceChildren(component.render());
	}
}
