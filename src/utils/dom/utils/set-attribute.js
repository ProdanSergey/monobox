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
