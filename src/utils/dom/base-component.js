import { ObjectNamespace } from "@utils/fn";
import { State } from "@utils/state";
import { SyntheticEvent } from "./events";
import { isElement } from "./utils/fn";

export class BaseComponent {
	#ref = null;

	constructor(props = {}) {
		this.props = Object.freeze(props);

		let prevProps = props;
		let prevState = this.state;

		const mount = (render) => {
			this.onBeforeMount?.();
			this.#ref = render;
			this.onMount?.();
		};

		const update = (render) => {
			this.#ref.replaceWith(render);
			this.#ref = render;
			this.onUpdate?.(prevProps, prevState);
		};

		const snapshot = () => {
			prevProps = ObjectNamespace.deepCopy(this.props);
			prevState = self.state && ObjectNamespace.deepCopy(this.state);
		};

		const proxy = new Proxy(this, {
			get(self, key) {
				if (key === "render") {
					return () => {
						const render = self.render();

						requestAnimationFrame(() => {
							isElement(self.#ref) ? update(render) : mount(render);
							snapshot();
						});

						return render;
					};
				}
				return Reflect.get(self, key);
			},
			set(self, key, value) {
				if (key === "state") {
					return Reflect.set(
						self,
						key,
						new State(value).subscribe(() => {
							proxy.render();
						})
					);
				}

				return Reflect.set(self, key, value);
			},
			defineProperty(self, key, attributes) {
				if (key === "state") {
					return Reflect.defineProperty(self, key, {
						...attributes,
						value: new State(attributes.value).subscribe(() => {
							proxy.render();
						}),
					});
				}

				return Reflect.defineProperty(self, key, attributes);
			},
		});

		return proxy;
	}

	emit = (type, payload) => {
		this.#ref.dispatchEvent(
			new SyntheticEvent(type, {
				detail: payload,
				bubbles: true,
			})
		);
	};
}
