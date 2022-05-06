import { BaseComponent, DOMRenderer, span } from "@utils/dom";

export class Face extends BaseComponent {
	format(value) {
		return String(value).padStart(2, 0);
	}

	render() {
		const { hours, minutes, seconds } = this.props;

		return DOMRenderer.create("time", { className: "face" }, [
			span({ className: "face__digit" }, [this.format(hours)]),
			span({ className: "face__separator" }, [":"]),
			span({ className: "face__digit" }, [this.format(minutes)]),
			span({ className: "face__digit face__seconds" }, [this.format(seconds)]),
		]);
	}
}
