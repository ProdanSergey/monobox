import { BaseComponent } from "../base-component";

export const isComponent = (v) => v instanceof BaseComponent;
export const isFunctionComponent = (v) => v instanceof Function;
export const isFragment = (v) => v instanceof DocumentFragment;
export const isElement = (v) => v instanceof HTMLElement;
export const isElementType = (v, tagName) => isElement(v) && v.tagName === tagName;
export const isEventHandler = (v) => v.startsWith("@");

export const hasParent = (v, selector) => {
	if (!isElement(v)) {
		return false;
	}

	const closest = v.closest(selector);

	if (closest === null) {
		return false;
	}

	return v !== closest;
};
