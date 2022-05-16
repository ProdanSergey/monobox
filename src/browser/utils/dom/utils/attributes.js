import { ArrayNamespace, ObjectNamespace } from "@utils/fn";
import { isEventHandler } from "./fn";

const setClassName = (node, { value }) => {
	value.split(" ").forEach((className) => {
		node.classList.add(className);
	});
};

const setBoolean = (node, { key, value }) => {
	value ? node.setAttribute(key, "") : node.removeAttribute(key);
};

const setters = {
	class: setClassName,
	className: setClassName,
	hidden: setBoolean,
};

export const setAttribute = (node) => (key, value) => {
	setters[key] ? setters[key](node, { key, value }) : node.setAttribute(key, value);
};

export const mapAttributes = (attributes) => {
	const [refKey, handlerKeys, propsKeys] = ArrayNamespace.segregate(
		Object.keys(attributes),
		(key) => key === "ref",
		(key) => isEventHandler(key)
	);

	return {
		ref: attributes[refKey],
		handlers: ObjectNamespace.pick(attributes, handlerKeys),
		props: ObjectNamespace.pick(attributes, propsKeys),
	};
};
