import { Framework } from "../framework";
import { listen } from "../utils/listen";

export const div = (attributes, children) => {
  return Framework.create("div", attributes, children);
};

export const headline = (level) => (attributes, children) => {
  return Framework.create(`h${level}`, attributes, children);
};

export const h1 = headline(1);
export const h2 = headline(2);
export const h3 = headline(3);
export const h4 = headline(4);
export const h5 = headline(5);
export const h6 = headline(6);

export const p = (attributes, children) => {
  return Framework.create("p", attributes, children);
};

export const span = (attributes, children) => {
  return Framework.create("span", attributes, children);
};

export const article = (attributes, children) => {
  return Framework.create("article", attributes, children);
};

export const section = (attributes, children) => {
  return Framework.create("section", attributes, children);
};

export const header = (attributes, children) => {
  return Framework.create("header", attributes, children);
};

export const footer = (attributes, children) => {
  return Framework.create("footer", attributes, children);
};

export const main = (attributes, children) => {
  return Framework.create("main", attributes, children);
};

export const button = (attributes, children) => {
  return Framework.create("button", attributes, children);
};

export const list = (type) => (attributes, children) => {
  switch (type) {
    case true:
      return Framework.create("ol", attributes, children);

    default:
      return Framework.create("ul", attributes, children);
  }
};

export const oList = list("ol");
export const uList = list("ul");

export const item = (attributes, children) => {
  return Framework.create("li", attributes, children);
};

export const image = (attributes, children) => {
  return Framework.create("img", attributes, children);
};

export const anchor = (attributes, children) => {
  return Framework.create("a", attributes, children);
};

export const form = (attributes, children) => {
  const form = Framework.create("form", attributes, children);

  listen(form)("@submit", (e) => e.preventDefault());

  return form;
};

export const label = (attributes, children) => {
  return Framework.create("label", attributes, children);
};

export const input = (attributes, children) => {
  return Framework.create("input", attributes, children);
};
