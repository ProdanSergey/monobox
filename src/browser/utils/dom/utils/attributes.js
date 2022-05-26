import { isFunction, not, isNullish } from "@utils/fn";
import { render } from "./render";

const clearAttribute = (node, { key }) => {
  if (node.hasAttribute(key)) {
    node.removeAttribute(key);
  }
};

const setClassName = (node, { value }) => {
  value.split(" ").forEach((className) => {
    node.classList.add(className);
  });
};

const setBoolean = (node, { key, value }) => {
  value ? node.setAttribute(key, "") : node.removeAttribute(key);
};

const setRef = (node, { key, value }) => {
  clearAttribute(node, { key });

  if (!value) {
    return;
  }

  if (isFunction(value)) {
    value(node);
    return;
  }

  value.set(node);
};

const setListener = (node, { key, value }) => {
  value && node.addEventListener(key.slice(1).toLowerCase(), value);
  clearAttribute(node, { key });
};

const setters = {
  ref: setRef,
  class: setClassName,
  className: setClassName,
  hidden: setBoolean,
  disabled: setBoolean,
  readonly: setBoolean,
};

export const setAttribute = (node, { key, value }) => {
  if (key.startsWith("@")) {
    setListener(node, { key, value });
    return;
  }

  if (setters[key]) {
    setters[key](node, { key, value });
    return;
  }

  node.setAttribute(key, value);
};

export const mapChildren = (children) => {
  if (!Array.isArray(children)) {
    throw new DOMException("Children must be an array");
  }

  return children.filter(not(isNullish)).map(render);
};

const mappers = {
  children: mapChildren,
};

export const mapProp = ({ key, value }) => {
  if (mappers[key]) {
    return mappers[key](value);
  }

  return value;
};
