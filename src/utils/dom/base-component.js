import { ObjectNamespace } from "@utils/fn";
import { StateError } from "./errors";
import { SyntheticEvent } from "./events";

const context = new WeakMap();

const getContext = (instance) => {
	return context.get(instance);
};

const setContext = (instance, state) => {
	context.set(instance, state);
};

export class BaseComponent {
	constructor(props = {}) {
		this.props = Object.freeze(props);

		context.set(this, {
			ref: null,
			isMounted: false,
			prevProps: props,
			prevState: this.state,
		});

		return new Proxy(this, {
			get(self, methodName) {
				switch (methodName) {
					case "render":
						return () => {
							const render = self.render();

							requestAnimationFrame(() => {
								const { ref, isMounted, prevProps, prevState } = getContext(self);

								!isMounted && self.onBeforeMount && self.onBeforeMount();

								isMounted && ref.replaceWith(render);

								isMounted ? self.onUpdate?.(prevProps, prevState) : self.onMount?.();

								setContext(self, {
									ref: render,
									isMounted: true,
									prevProps: ObjectNamespace.deepCopy(self.props),
									prevState: self.state && ObjectNamespace.deepCopy(self.state),
								});
							});

							return render;
						};
					default:
						break;
				}

				return self[methodName];
			},
		});
	}

	setState(updater) {
		if (!this.state) {
			throw new StateError("Component does not have a state");
		}

		this.state = updater(this.state);

		this.render();
	}

	emit(type, payload) {
		getContext(this).ref.dispatchEvent(
			new SyntheticEvent(type, {
				detail: payload,
				bubbles: true,
			})
		);
	}
}
