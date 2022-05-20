import { isElement } from "./fn";

export const create = (node) => {
  if (isElement(node)) {
    return node;
  }

  return document.createElement(node);
};
