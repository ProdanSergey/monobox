import { BaseComponent, div } from "@utils/dom";
import { AlarmScreen } from "./alarm.screen";
import { ClockScreen } from "./clock.screen";

export class App extends BaseComponent {
	render() {
		return div({ className: "app" }, [new ClockScreen(), new AlarmScreen()]);
	}
}
