import { CheckboxFactory } from "./fields/checkbox";
import { CheckboxGroupFactory } from "./fields/checkbox-group";
import { RadioGroupFactory } from "./fields/radio-group";

const FieldFactory = (Field) => (element) => {
	if (element.dataset.type === "checkbox-group") {
		return CheckboxGroupFactory(element, Field);
	}

	if (element.dataset.type === "radio-group") {
		return RadioGroupFactory(element, Field);
	}

	if (element.type === "checkbox") {
		return CheckboxFactory(element, Field);
	}

	return new Field(element);
};

import { isElement } from "@utils/dom/utils/fn";
import { State } from "@utils/state";

class Field {
	constructor(element) {
		if (!isElement(element)) {
			throw new DOMException("Field is not an element");
		}

		this.element = element;
	}

	get name() {
		return this.element.name;
	}

	get value() {
		return this.element.value;
	}

	addEventListener(eventType, callback) {
		this.element.addEventListener(eventType, (event) => {
			event.stopPropagation();

			callback(this);
		});
	}
}

class StatelessField extends Field {
	get willValidate() {
		return this.element.willValidate;
	}

	get validity() {
		return this.element.validity;
	}

	setCustomValidity(error) {
		if (!this.willValidate) {
			throw new DOMException("Element is not supporting Constraint API");
		}

		this.element.setCustomValidity(error);
	}
}

export const StatelessFieldFactory = FieldFactory(StatelessField);

class StatefulField extends Field {
	#validity;

	constructor(...args) {
		super(...args);

		this.#init();
	}

	#init() {
		this.#validity = new State({
			required: false,
			valid: true,
		}).subscribe(() => {
			this.#updateDOM();
		});
	}

	#updateDOM() {
		this.element.setAttribute("aria-invalid", !this.validity.valid);
	}

	get willValidate() {
		return !this.element.disabled;
	}

	get validity() {
		return this.#validity;
	}

	setCustomValidity(valid) {
		this.#validity.valid = valid;
	}
}

export const StatefulFieldFactory = FieldFactory(StatefulField);
