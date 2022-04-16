import { Framework } from "../framework";

export const div = (attributes, children) => {
	return Framework.create("div", attributes, children);
};

export const headline = (level, attributes, children) => {
	return Framework.create(`h${level}`, attributes, children);
};

export const p = (attributes, children) => {
	return Framework.create("p", attributes, children);
};

export const span = (attributes, children) => {
	return Framework.create("span", attributes, children);
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

export const list = (type, attributes, children) => {
	switch (type) {
		case true:
			return Framework.create("ol", attributes, children);

		default:
			return Framework.create("ul", attributes, children);
	}
};

export const item = (attributes, children) => {
	return Framework.create("li", attributes, children);
};

export const image = (attributes, children) => {
	return Framework.create("img", attributes, children);
};

export const anchor = (attributes, children) => {
	return Framework.create("a", attributes, children);
};
