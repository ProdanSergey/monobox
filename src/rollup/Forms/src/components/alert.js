import { isElement } from "@utils/dom/utils/fn";

export class FormAlert {
	constructor(element) {
		if (!isElement(element)) {
			throw new DOMException("Alert is not an element");
		}

		this.element = element;
	}

	error(error) {
		this.element.innerHTML = `<span data-type="error">${error}</span>`;

		return this;
	}

	info(message) {
		this.element.innerHTML = `<span data-type="warning">${message}</span>`;

		return this;
	}

	clear() {
		this.element.innerHTML = "";

		return this;
	}

	show() {
		this.element.style.visibility = "visible";
	}

	hide() {
		this.element.style.visibility = "hidden";
	}
}
