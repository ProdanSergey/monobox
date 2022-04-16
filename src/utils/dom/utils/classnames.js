import { isObject, ObjectNamespace } from "@utils/fn";

export const classnames = (...classNames) => {
	return classNames
		.reduce((acc, current) => {
			if (isObject(current)) {
				return [...acc, ...classnames(ObjectNamespace.truthyKeys(current))];
			}

			if (Array.isArray(current)) {
				return [...acc, ...classnames(current)];
			}

			return [...acc, current];
		}, [])
		.join(" ");
};
