import { compose, ObjectNamespace } from "@utils/fn";
import { State } from "@utils/state";
import { mapProp } from "./utils/attributes";
import { render } from "./utils/render";
import { SyntheticEvent } from "./events";

const COMPONENT_TOKEN = {
  RENDER: "render",
  STATE: "state",
};

const then_map_props = (props) => {
  return ObjectNamespace.map(props, (key, value) => mapProp({ key, value }));
};

export class BaseComponent {
  #node = null;

  constructor(props = {}) {
    this.props = compose(Object.freeze, then_map_props)(props);

    let prevState,
      mounted = false;

    const is_mounted = () => mounted;

    const seed = (node) => {
      this.#node = node;
      if (!is_mounted()) mounted = true;
    };

    const mount = (node) => {
      this.onBeforeMount?.();
      seed(node);
      this.onMount?.();
    };

    const update = (node) => {
      this.#node.replaceWith(node);
      seed(node);
      this.onUpdate?.(prevState);
    };

    const snapshot = () => {
      prevState = this.state && ObjectNamespace.deepCopy(this.state);
    };

    const proxy = new Proxy(this, {
      get(self, key) {
        const reflect = () => Reflect.get(self, key);

        if (key === COMPONENT_TOKEN.RENDER) {
          return () => {
            const root = render(self.render());

            requestAnimationFrame(() => {
              is_mounted() ? update(root) : mount(root);
              snapshot();
            });

            return root;
          };
        }

        return reflect();
      },
      set(self, key, value) {
        const reflect = (value) => Reflect.set(self, key, value);

        if (key === COMPONENT_TOKEN.STATE) {
          return reflect(
            new State(value).subscribe(() => {
              proxy.render();
            })
          );
        }

        return reflect(value);
      },
      defineProperty(self, key, attributes) {
        const reflect = (value) =>
          Reflect.defineProperty(self, key, {
            ...attributes,
            value,
          });

        if (key === COMPONENT_TOKEN.STATE) {
          return reflect(
            new State(attributes.value).subscribe(() => {
              proxy.render();
            })
          );
        }

        return reflect(attributes.value);
      },
    });

    return proxy;
  }

  emit = (type, detail) => {
    this.#node?.dispatchEvent(new SyntheticEvent(type, detail));
  };

  on = (type, callback) => {
    document.addEventListener(type, callback);
  };

  findNode(selector) {
    return this.#node?.querySelector(selector);
  }
}
