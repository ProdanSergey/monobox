import { compose, isNullish, ObjectNamespace } from "@utils/fn";
import { isElement } from "./utils/fn";
import { setAttribute } from "./utils/attributes";
import { create } from "./utils/create";
import { render } from "./utils/render";

const withChildren = (children) => (node) => {
  node.append(...children.filter((child) => !isNullish(child)).map(render));

  return node;
};

const withAttributes = (attrs) => (node) => {
  const then_set_attribute = setAttribute(node);

  ObjectNamespace.forEach(attrs, (key, value) => {
    then_set_attribute(key, value);
  });

  return node;
};

export class Framework {
  static create(node, attributes = {}, children = []) {
    return compose(withChildren(children), withAttributes(attributes))(create(node));
  }

  static mount(root, node) {
    if (!isElement(root)) {
      throw new DOMException("Root must be valid DOM element");
    }

    create(root).replaceChildren(render(node));
  }

  static interpolate(node) {
    return compose(render, create)(node).outerHTML;
  }

  static hydrate(html, attrs) {
    const then_set_attributes = (node) => {
      for (const child of node.children) {
        const then_set_attribute = setAttribute(child);

        Array.from(child.attributes).forEach(({ name, value }) => {
          if (ObjectNamespace.hasProperty(attrs, value)) {
            then_set_attribute(name, attrs[value]);
          }
        });

        then_set_attributes(child);
      }
    };

    const div = create("div");
    div.insertAdjacentHTML("afterbegin", html);

    then_set_attributes(div.firstElementChild);

    return div.firstElementChild;
  }

  static createRef(key) {
    return Object.seal({
      current: null,
      set(ref) {
        this.current = ref;

        return { [key]: this.current };
      },
    });
  }
}
