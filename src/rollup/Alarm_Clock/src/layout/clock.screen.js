import { DATE } from "@utils/date";
import { article, BaseComponent, div } from "@utils/dom";
import alertOff from "../assets/icons/alert-off.svg";
import alertOn from "../assets/icons/alert-on.svg";
import alertOnRepeatable from "../assets/icons/alert-on-repeatable.svg";
import { ButtonWithIcon } from "../components/button.component";
import { Face } from "../components/face.component";
import { StatusBar } from "../components/statusbar.component";

import "./clock.styles.css";

class SetAlarm extends BaseComponent {
	state = { alarm: { active: false, repeatable: false } };

	click = () => {
		this.emit("dialog:open", "set-alarm-dialog");
	};

	onMount() {
		this.on("alarm:set", ({ detail: { repeatable } }) => {
			this.state.alarm = { active: true, repeatable };
		});
		this.on("alarm:dismiss", () => {
			this.state.alarm = { active: true, repeatable: false };
		});
	}

	render() {
		const { active, repeatable } = this.state.alarm;

		return new ButtonWithIcon({
			icon: active ? (repeatable ? alertOnRepeatable() : alertOn()) : alertOff(),
			className: "clock__icon",
			onClick: this.click,
		});
	}
}

class ClockFace extends BaseComponent {
	state = { time: this.time() };

	time() {
		const { h, m, s } = DATE.getTime();

		return { hours: h, minutes: m, seconds: s };
	}

	onMount() {
		const { ms } = DATE.getTime();

		setTimeout(() => {
			this.state.time = this.time();

			setInterval(() => {
				this.state.time = this.time();
			}, 1000);
		}, 1000 - ms);
	}

	render() {
		return article({}, [new Face({ ...this.state.time })]);
	}
}

export class ClockScreen extends BaseComponent {
	timerId = null;
	repeatable = false;

	clearAlarm() {
		clearTimeout(this.timerId);
	}

	setRepeatableAlarm() {
		this.timerId = setInterval(() => {
			this.emit("alarm:active");
		}, 1000 * 60 * 60);
	}

	setAlarm = ({ ms }, repeatable) => {
		if (this.timerId) {
			this.clearAlarm();
		}

		this.timerId = setTimeout(() => {
			this.emit("alarm:active");

			if (repeatable) {
				this.setRepeatableAlarm();
			}
		}, ms);
	};

	onMount() {
		this.on("alarm:set", ({ detail: { alarm, repeatable } }) => {
			this.setAlarm(alarm, repeatable);
		});
		this.on("alarm:clear", () => {
			this.clearAlarm();
		});
	}

	render() {
		return div(
			{
				className: "screen clock",
			},
			[
				new StatusBar({
					children: [new SetAlarm()],
				}),
				new ClockFace(),
			]
		);
	}
}
