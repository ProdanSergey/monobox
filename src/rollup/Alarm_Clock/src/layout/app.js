import { BaseComponent, div } from "@utils/dom";
import { Dialog } from "../components/dialog.component";
import { AlarmScreen } from "./alarm.screen";
import { ClockScreen } from "./clock.screen";
import { SetAlarmScreen } from "./set-alarm.screen";

export class App extends BaseComponent {
	render() {
		return div({ className: "app" }, [
			new ClockScreen(),
			new Dialog({
				id: "set-alarm-dialog",
				children: new SetAlarmScreen(),
			}),
			new Dialog({
				id: "alarm-dialog",
				children: new AlarmScreen(),
			}),
		]);
	}
}
