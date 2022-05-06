import { BaseComponent, button, div, uList } from "@utils/dom";
import alertOff from "../assets/icons/alert-off.svg";
import alertOn from "../assets/icons/alert-on.svg";
import { toggleTheme } from "../helpers/theme";
import { Dialog } from "../components/dialog.component";
import { Icon } from "../components/icon.component";
import { AlarmScreen } from "./alarm.screen";

class AlarmIcon extends BaseComponent {
	state = { active: false };

	open = () => {
		this.state.active = true;
	};

	close = () => {
		this.state.active = false;
	};

	onUpdate() {
		toggleTheme("alarm");
	}

	render() {
		const { active } = this.state;

		return div({}, [
			button({ "@click": !active && this.open }, [
				new Icon({ icon: active ? alertOn() : alertOff(), className: "statusbar__icon" }),
			]),
			new Dialog({
				hidden: !active,
				className: "screen",
				children: new AlarmScreen({ onSubmit: this.close }),
			}),
		]);
	}
}

export class ClockStatusBar extends BaseComponent {
	render() {
		return div({ className: "statusbar" }, [uList({ className: "statusbar__list" }, [new AlarmIcon()])]);
	}
}
