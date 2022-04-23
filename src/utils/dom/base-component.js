import { isFunction, isObject, ObjectNamespace } from "@utils/fn";
import { State } from "@utils/state";
import { SyntheticEvent } from "./events";

export class BaseComponent {
	#ref = null;

	constructor(props = {}) {
		this.props = Object.freeze(props);

		let mounted = false;
		let prevProps = props;
		let prevState = this.state;

		const isMounted = () => mounted;

		const mount = (render) => {
			this.onBeforeMount?.();
			this.#ref = render;
			mounted = true;
			this.onMount?.();
		};

		const update = (render) => {
			this.#ref.replaceWith(render);
			this.#ref = render;
			this.onUpdate?.(prevProps, prevState);
		};

		const setState = () => {
			isMounted() && proxy.render();
		};

		const snapshot = () => {
			prevProps = ObjectNamespace.deepCopy(this.props);
			prevState = isObject(self.state) ? ObjectNamespace.deepCopy(this.state) : null;
		};

		const proxy = new Proxy(this, {
			get(self, key) {
				const reflect = () => Reflect.get(self, key);

				if (key === "render") {
					return () => {
						const render = self.render();

						requestAnimationFrame(() => {
							isMounted() ? update(render) : mount(render);
							snapshot();
						});

						return render;
					};
				}

				return reflect();
			},
			set(self, key, value) {
				if (key === "state") {
					return Reflect.set(self, key, new State(value).subscribe(setState));
				}

				return Reflect.set(self, key, value);
			},
			defineProperty(self, key, attributes) {
				if (key === "state") {
					return Reflect.defineProperty(self, key, {
						...attributes,
						value: new State(attributes.value).subscribe(setState),
					});
				}

				return Reflect.defineProperty(self, key, attributes);
			},
		});

		return proxy;
	}

	emit = (type, payload) => {
		this.#ref.dispatchEvent(new SyntheticEvent(type, { payload }));
	};
}
