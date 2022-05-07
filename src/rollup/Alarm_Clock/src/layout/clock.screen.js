import { DATE } from "@utils/date";
import { article, BaseComponent, div } from "@utils/dom";
import alertOff from "../assets/icons/alert-off.svg";
import alertOn from "../assets/icons/alert-on.svg";
import { ButtonWithIcon } from "../components/button.component";
import { Dialog } from "../components/dialog.component";
import { Face } from "../components/face.component";
import { StatusBar } from "../components/statusbar.component";
import { toggleTheme } from "../helpers/theme";
import { SetAlarmScreen } from "./set-alarm.screen";

class SetAlarm extends BaseComponent {
	state = { alarm: { hidden: true, active: false } };

	timerId = null;

	open = () => {
		this.state.alarm = { ...this.state.alarm, hidden: false };
	};

	close = () => {
		this.state.alarm = { ...this.state.alarm, hidden: true };
	};

	submit = ({ ms }) => {
		this.state.alarm = { hidden: true, active: true };

		if (this.timerId) {
			clearTimeout(this.timerId);
		}

		this.timerId = setTimeout(() => {
			this.emit("clock:alarm");
		}, ms);
	};

	onUpdate() {
		toggleTheme("set-alarm");
	}

	render() {
		const { hidden, active } = this.state.alarm;

		return div({}, [
			new ButtonWithIcon({
				icon: active ? alertOn() : alertOff(),
				className: "clock__icon",
				onClick: this.open,
			}),
			new Dialog({
				hidden,
				children: new SetAlarmScreen({ onSubmit: this.submit, onClose: this.close }),
			}),
		]);
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
	render() {
		return div(
			{
				className: "screen clock",
			},
			[new StatusBar({ children: [new SetAlarm()] }), new ClockFace()]
		);
	}
}
