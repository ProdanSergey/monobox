import { BaseComponent, classnames, div } from "@utils/dom";
import { DATE } from "@utils/date";
import tickIcon from "../assets/icons/tick.svg";
import cancelIcon from "../assets/icons/cancel.svg";
import repeatIcon from "../assets/icons/repeat.svg";
import { ButtonWithIcon } from "../components/button.component";
import { EditableFace } from "../components/face.component";
import { StatusBar } from "../components/statusbar.component";

import "./set-alarm.styles.css";

class Repeat extends BaseComponent {
	state = { active: false };

	onUpdate() {
		this.emit("alarm:repeat", this.state.active);
	}

	click = () => {
		this.state.active = !this.state.active;
	};

	render() {
		const { active } = this.state;

		return new ButtonWithIcon({
			icon: repeatIcon(),
			className: classnames({ "set-alarm__negative": !active, "set-alarm__positive": active }),
			onClick: this.click,
		});
	}
}

export class SetAlarmScreen extends BaseComponent {
	repeatable = false;

	close = () => {
		this.emit("dialog:close", "set-alarm-dialog");
	};

	submit = (value) => {
		const [hours, minutes, seconds] = value.split(":").map(Number);

		const from = new Date();
		let to = new Date(from.getFullYear(), from.getMonth(), from.getDate(), hours, minutes, seconds);

		if (from > to) to.setDate(to.getDate() + 1);

		const alarm = DATE.diff(from, to);

		this.emit("alarm:set", { alarm, repeatable: this.repeatable });
		this.close();
	};

	onMount() {
		this.on("alarm:repeat", ({ detail }) => {
			this.repeatable = detail;
		});
	}

	render() {
		return div({ className: "screen set-alarm" }, [
			div({ className: "set-alarm__statusbar" }, [
				new StatusBar({
					children: [new Repeat()],
				}),
				new StatusBar({
					children: [
						new ButtonWithIcon({
							icon: cancelIcon(),
							onClick: this.close,
							className: "set-alarm__negative",
						}),
						new ButtonWithIcon({
							icon: tickIcon(),
							form: "set-alarm",
							type: "submit",
							className: "set-alarm__positive",
						}),
					],
				}),
			]),
			new EditableFace({ name: "set-alarm", onSubmit: this.submit }),
		]);
	}
}
