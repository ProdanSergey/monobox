import { BaseComponent, div, span } from "@utils/dom";
import { Dialog } from "../components/dialog.component";
import { StatusBar } from "../components/statusbar.component";
import { toggleTheme } from "../helpers/theme";

class Screen extends BaseComponent {
	render() {
		return div({ className: "screen alarm" }, [
			new StatusBar(),
			div({ className: "alarm__message" }, [span({}, ["Wake Up!"])]),
		]);
	}
}

export class AlarmScreen extends BaseComponent {
	state = { hidden: true };

	onMount() {
		document.addEventListener("clock:alarm", () => {
			this.state.hidden = false;
		});
	}

	onUpdate() {
		toggleTheme("alarm");
	}

	render() {
		const { hidden } = this.state;

		return new Dialog({
			hidden,
			children: new Screen(),
		});
	}
}
