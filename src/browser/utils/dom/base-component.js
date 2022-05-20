import { isObject, ObjectNamespace } from "@utils/fn";
import { State } from "@utils/state";
import { render } from "./utils/render";
import { SyntheticEvent } from "./events";

const COMPONENT_MEMBER = {
  RENDER: "render",
  STATE: "state",
};
export class BaseComponent {
  #node = null;

  constructor(props = {}) {
    this.props = Object.freeze(
      ObjectNamespace.map(props, (key, value) => {
        if (key === "children") {
          return render(value);
        }

        return value;
      })
    );

    let mounted = false;
    let prevProps = props;
    let prevState = this.state;

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
      this.onUpdate?.(prevProps, prevState);
    };

    const snapshot = () => {
      prevProps = ObjectNamespace.deepCopy(this.props);
      prevState = isObject(self.state) ? ObjectNamespace.deepCopy(this.state) : null;
    };

    const renderer = () => {
      is_mounted() && proxy.render();
    };

    const proxy = new Proxy(this, {
      get(self, key) {
        const reflect = () => Reflect.get(self, key);

        if (key === COMPONENT_MEMBER.RENDER) {
          return () => {
            const node = render(self.render());

            requestAnimationFrame(() => {
              is_mounted() ? update(node) : mount(node);
              snapshot();
            });

            return node;
          };
        }

        return reflect();
      },
      set(self, key, value) {
        const reflect = (value) => Reflect.set(self, key, value);

        if (key === COMPONENT_MEMBER.STATE) {
          return reflect(new State(value).subscribe(renderer));
        }

        return reflect(value);
      },
      defineProperty(self, key, attributes) {
        const reflect = (value) =>
          Reflect.defineProperty(self, key, {
            ...attributes,
            value,
          });

        if (key === COMPONENT_MEMBER.STATE) {
          return reflect(new State(attributes.value).subscribe(renderer));
        }

        return reflect(attributes.value);
      },
    });

    return proxy;
  }

  emit = (type, detail) => {
    this.#node.dispatchEvent(new SyntheticEvent(type, detail));
  };

  on = (type, callback) => {
    document.addEventListener(type, callback);
  };

  findNode(selector) {
    return this.#node?.querySelector(selector);
  }
}
