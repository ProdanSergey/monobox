import { isComponent, isFunctionComponent } from "./fn";

export const render = (node) => {
  if (isComponent(node)) {
    return node.render();
  }

  if (isFunctionComponent(node)) {
    return node();
  }

  return node;
};
