import { BaseComponent, classnames, DOMRenderer, form, input, span } from "@utils/dom";

import "./face.styles.css";

const format = (value) => {
	return String(value).padStart(2, 0);
};

export class Face extends BaseComponent {
	render() {
		const { hours, minutes, seconds } = this.props;

		return DOMRenderer.create("time", { className: "face" }, [
			span({ className: "face__digit" }, [format(hours)]),
			span({ className: "face__separator" }, [":"]),
			span({ className: "face__digit" }, [format(minutes)]),
			span({ className: "face__digit face__seconds" }, [format(seconds)]),
		]);
	}
}

const mapMaxValue = ({ name }) => {
	switch (name) {
		case "hours":
			return 23;
		default:
			return 59;
	}
};

export class EditableFace extends BaseComponent {
	handleInput = ({ target }) => {
		const value = Number(target.value);

		if (isNaN(value) || value < 0) {
			target.value = format(0);
		}

		const maxValue = mapMaxValue(target);

		if (value > maxValue) {
			target.value = format(maxValue);
		}
	};

	handleSubmit = ({ target: { hours, minutes, seconds } }) => {
		this.props.onSubmit?.([hours, minutes, seconds].map((el) => el.value).join(":"));
	};

	render() {
		const { name } = this.props;

		const formInput = (name, value, className) => {
			return input({
				name,
				className: classnames("face__input", className),
				value: format(value),
				maxLength: 2,
				"@input": this.handleInput,
			});
		};

		return form({ id: name, name, novalidate: true, className: "face", "@submit": this.handleSubmit }, [
			formInput("hours", 0),
			span({ className: "face__separator" }, [":"]),
			formInput("minutes", 0),
			formInput("seconds", 0, "face__seconds"),
		]);
	}
}
