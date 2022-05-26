import { compose, ObjectNamespace } from "@utils/fn";
import { isElement } from "./utils/fn";
import { mapChildren, setAttribute } from "./utils/attributes";
import { create } from "./utils/create";
import { render } from "./utils/render";
import { interpolate } from "@utils/string";

export class Framework {
  static create(node, attrs, children) {
    const then_set_children = (node) => {
      if (!children) {
        return node;
      }
      node.append(...mapChildren(children));
      return node;
    };

    const then_set_attributes = (node) => {
      if (!attrs) {
        return node;
      }
      ObjectNamespace.forEach(attrs, (key, value) => setAttribute(node, { key, value }));
      return node;
    };

    return compose(then_set_children, then_set_attributes, create)(node);
  }

  static mount(root, node) {
    if (!isElement(root)) {
      throw new DOMException("Root must be valid DOM element");
    }

    create(root).replaceChildren(render(node));
  }

  static hydrate(html, attrs, children) {
    const then_interpolate_children = (node) => {
      if (!children) {
        return node;
      }
      node.replaceWith(...interpolate(node.nodeValue, { children: mapChildren(children) }, (chunks) => chunks.flat()));
      return node;
    };

    const then_set_attributes = (node) => {
      if (!attrs) {
        return node;
      }
      Array.from(node.attributes)
        .filter(({ value }) => ObjectNamespace.hasProperty(attrs, value))
        .forEach(({ name, value }) => {
          setAttribute(node, { key: name, value: attrs[value] });
        });
      return node;
    };

    const then_hydrate = (node) => {
      for (const childNode of node.childNodes) {
        if (childNode.nodeType === Node.TEXT_NODE) {
          then_interpolate_children(childNode);
        }

        if (childNode.nodeType === Node.ELEMENT_NODE) {
          compose(then_hydrate, then_set_attributes)(childNode);
        }
      }
    };

    const div = create("div");
    div.insertAdjacentHTML("afterbegin", html);

    then_hydrate(div);

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
