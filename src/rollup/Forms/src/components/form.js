import { isElement, isElementType, hasParent } from "@utils/dom/utils/fn";
import { isObject } from "@utils/fn";
import { State } from "@utils/state";
import { FormAlert } from "./alert";
import { StatelessFieldFactory, StatefulFieldFactory } from "./field";

class Form {
	constructor(props = {}, fieldFactory) {
		const form = document.forms[props.name];

		if (!isElement(form)) {
			throw new DOMException("Form is not found");
		}

		this.element = form;
		this.props = props;

		this.#init(fieldFactory);
	}

	#init(fieldFactory) {
		this.fields = Object.keys(this.element.elements).reduce((fields, key) => {
			if (isFinite(key)) {
				return fields;
			}

			const field = this.element[key];

			if (isElementType(field, "BUTTON") || !isElement(field) || hasParent(field, "fieldset")) {
				return fields;
			}

			return { ...fields, [key]: fieldFactory(field) };
		}, {});

		this.element.addEventListener("submit", this.#handleSubmit);
		this.element.addEventListener("reset", this.#handleReset);
	}

	#handleSubmit = (event) => {
		event.preventDefault();

		if (!this.validate()) {
			return;
		}

		this.props.onSubmit?.(this.serialize());
	};

	#handleReset = (event) => {
		event.preventDefault();

		const shouldReset = this.props.onReset?.() ?? true;

		if (shouldReset) {
			this.element.reset();
		}
	};

	messages() {
		return this.props.messages ?? {};
	}

	getMessage(name) {
		return this.messages()[name];
	}

	forEach(callback) {
		return Object.keys(this.fields).forEach((key, i) => {
			callback(this.fields[key], i, this.fields);
		});
	}
}

export class StatelessForm extends Form {
	constructor(props) {
		super(props, StatelessFieldFactory);

		this.#init();
	}

	#init() {
		for (const field of this.fields) {
			field.addEventListener("input", this.#handleInput);
			field.addEventListener("invalid", this.#handleInvalid);
		}
	}

	#handleInvalid = (target) => {
		if (!target.willValidate) {
			return;
		}

		const message = this.getMessage[target.name];

		if (message) {
			target.setCustomValidity(message);
		}
	};

	#handleInput = (target) => {
		if (!target.validity.customError) {
			return;
		}

		target.setCustomValidity("");
	};

	serialize() {
		const formData = new FormData(this.element);

		return Array.from(new Set(formData.keys())).reduce(
			(state, key) => ({
				...state,
				[key]: formData.getAll(key).join(","),
			}),
			{}
		);
	}

	validate() {
		return this.element.checkValidity();
	}
}

export class StatefulForm extends Form {
	#state = new State({});

	constructor(props) {
		super(props, StatefulFieldFactory);

		this.#init();
	}

	#init() {
		this.alerts = Array.from(this.element.querySelectorAll('[role="alert"]')).reduce((alerts, element) => {
			if (!element.dataset.for) {
				return alerts;
			}

			return {
				...alerts,
				[element.dataset.for]: new FormAlert(element),
			};
		}, {});

		this.forEach((field) => {
			this.#state[field.name] = field.value;
			field.addEventListener("input", this.#handleInput);
		});
	}

	#handleInput = (field) => {
		const { name, value } = field;

		if (!field.validity.valid) {
			this.alerts[name]?.clear().hide();
			field.setCustomValidity(true);
		}

		this.#state[name] = value;
	};

	serialize() {
		return { ...this.#state };
	}

	validate() {
		const validator = this.props.validator;

		if (!isObject(validator)) {
			return true;
		}

		let errors = 0;

		this.forEach((field) => {
			const { name } = field;

			const test = validator[name];

			if (!test) {
				return;
			}

			const validity = Boolean(validator(this.#state[name], this.#state));

			if (!validity) {
				this.alerts[name]?.error(this.getMessage(name)).show();
				errors++;
			}

			field.setCustomValidity(validity);
		});

		return errors === 0;
	}
}
